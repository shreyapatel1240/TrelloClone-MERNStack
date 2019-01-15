import React, { Component } from 'react'
import axios from 'axios'
import { getToken } from '../services/tokenService';
import ManageToDo from './ManageToDo'
import { Card, Button } from 'react-bootstrap/lib'
import { withRouter } from "react-router";

class ListItem extends Component {
    state = {
        todo: [],
        modalShow: false,
        todoId: ''
    }

    componentDidMount = () => {
        // try {
        //     const token = getToken()
        //     const todo = await axios.get(`/todo/${this.props.board}/status/${this.props.status}`, {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     })
        //     console.log(todo.data.payload);
        //     this.setState({ todo: todo.data.payload })
        // }
        // catch (e) {
        //     console.log(e)
        // }
        // this.getToDos()
        const todo = this.props.todo.filter(todo => {
            return todo.statusId._id === this.props.status
        })
        this.setState({
            todo: todo
        })
    }

    modalClose = () => {
        this.setState({ modalShow: false })
    }

    handleClick = (id) => {
        this.setState({
            modalShow: true,
            todoId: id
        })
    }

    handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete the ToDo ?')) {
            try {
                const token = getToken()
                await axios.delete(`/todo/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                this.props.getToDos()
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    handleDescription = (desc) => {
        if (desc.length > 40) {
            return `${desc.substring(0, 30)}...`
        }
        return desc
    }

    render() {
        const todo = this.props.todo.filter(todo => {
            return todo.statusId._id === this.props.status
        })
        return (
            <>
                {todo.map(todo =>
                    <Card key={todo._id} className={todo.statusId.status.split(' ').join('_').toLowerCase()}>
                        <Card.Body>
                            <span className="item_text">
                                {todo.title}
                                <br />
                                <span className="item_desc">{this.handleDescription(todo.description)}</span>
                            </span>
                            <Button type="button" variant="" className="btn-xs btn-outline-danger float_right" onClick={() => this.handleDelete(todo._id)}>
                                <i className="material-icons">delete</i>
                            </Button>
                            <Button type="button" variant="" className="btn-xs btn-outline-info float_right" onClick={() => this.handleClick(todo._id)}>
                                <i className="material-icons" >edit</i>
                            </Button>
                        </Card.Body>
                    </Card>
                )
                }
                {this.state.modalShow === true ?
                    <ManageToDo
                        todoid={this.state.todoId}
                        show={this.state.modalShow}
                        onHide={this.modalClose}
                        user={this.props.user}
                        modalClose={this.modalClose}
                        getToDos={this.props.getToDos}
                    /> : ''
                }
            </>
        )
    }
}

export default withRouter(ListItem)