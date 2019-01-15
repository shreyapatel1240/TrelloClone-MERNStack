import React, { Component } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from 'react-bootstrap/lib'
import { getToken } from '../services/tokenService';
import { withRouter } from "react-router";

class ManageBoard extends Component {
    state = {
        status: [],
        boards: [],
        heading: 'Add Board',
        buttonText: 'Add',
        boardId: '',
        title: '',
        description: '',
        statusId: '',
        todoId: '',
        isUpdate: false
    }

    componentDidMount() {

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
            const { title, description } = this.state
            const { user } = this.props
            const createdBy = user._id
            await axios.post('/board', { title, description, createdBy }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            this.props.modalClose()
            this.props.getBoards()
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

export default withRouter(ManageBoard)