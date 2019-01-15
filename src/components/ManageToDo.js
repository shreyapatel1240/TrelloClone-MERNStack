import React, { Component } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap/lib'
import { getToken } from '../services/tokenService';
import { withRouter } from "react-router";

class ManageToDo extends Component {
    state = {
        status: [],
        boards: [],
        heading: 'Add ToDo',
        buttonText: 'Add',
        boardId: '',
        title: '',
        description: '',
        statusId: '',
        todoId: '',
        isUpdate: false
    }

    componentDidMount() {
        this.handleStatus()
        this.handleBoard()
        this.handleUpdate()
    }

    handleStatus = async () => {
        const token = getToken()
        try {
            const status = await axios.get(`/status`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            this.setState({
                status: status.data.payload.map(status => <option key={status._id} value={status._id}>{status.status}</option>),
                statusId: status.data.payload[0]._id
            })
            if (this.props && this.props.statusid) {
                this.setState({
                    statusId: this.props.statusid
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    handleBoard = async () => {
        const token = getToken()
        try {
            const boards = await axios.get(`/board`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            this.setState({
                boards: boards.data.payload.map(board => <option key={board._id} value={board._id}>{board.title}</option>),
                boardId: boards.data.payload[0]._id
            })
        } catch (e) {
            console.log(e)
        }
    }

    handleUpdate = async () => {
        try {
            const token = getToken()
            if (this.props && this.props.todoid) {
                const todo = await axios.get(`/todo/update/${this.props.todoid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const td = todo.data.payload
                this.setState({
                    todoId: td._id,
                    boardId: td.boardId,
                    title: td.title,
                    description: td.description,
                    statusId: td.statusId._id,
                    heading: 'Update ToDo',
                    buttonText: 'Update',
                    isUpdate: true
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const token = getToken()
        try {
            const { title, description, statusId, boardId } = this.state
            const { user } = this.props
            const createdBy = user._id
            const updatedBy = user._id
            if (this.props.todoid && this.state.isUpdate) {
                await axios.patch(`/todo/${this.state.todoId}`, { title, description, statusId, updatedBy, boardId }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } else {
                await axios.post('/todo', { title, description, statusId, createdBy, boardId }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
            this.props.modalClose()
            this.props.getToDos()
        } catch (e) {
            console.log(e)
        }
    }

    handleCancel = (e) => {
        e.preventDefault()
        this.setState({
            todoId: '',
            title: '',
            description: '',
            statusId: ''
        })
        this.props.modalClose()
    }

    render() {
        return (
            <>
                <Modal
                    onHide={this.props.onHide}
                    show={this.props.show}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.heading}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="statusId">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={this.state.statusId}
                                    onChange={this.handleChange}
                                >
                                    {this.state.status}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="boardId">
                                <Form.Label>Board</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={this.state.boardId}
                                    onChange={this.handleChange}
                                >
                                    {this.state.boards}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleSubmit} variant="primary" type="submit">{this.state.buttonText}</Button>
                        <Button onClick={this.handleCancel} variant="default">Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default withRouter(ManageToDo)