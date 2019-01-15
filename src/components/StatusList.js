import React, { Component } from 'react'
import axios from 'axios'
import ListItem from './ListItem'
import { getToken } from '../services/tokenService';
import { Button } from 'react-bootstrap/lib'
import { withRouter } from 'react-router'
import ManageToDo from './ManageToDo'

class StatusList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            status: [],
            modalShow: false,
            statusId: ''
        }
    }

    handleToDoAdd = (id) => {
        this.setState({
            modalShow: true,
            statusId: id
        })
    }

    modalClose = () => {
        this.setState({ modalShow: false })
    }

    componentDidMount = async () => {
        if (this.props.todos) {
            this.setState({ todos: this.props.todos })
        }
        try {
            const token = getToken()
            const status = await axios.get(`/status`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            this.setState({ status: status.data.payload })
            this.getToDos()
        } catch (e) {
            console.log(e)
        }
    }

    getToDos = async () => {
        try {
            const token = getToken()
            const todo = await axios.get(`/todo/${this.props.board}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            this.setState({ todos: todo.data.payload })
        }
        catch (e) {
            console.log(e)
        }
    }


    render() {
        if (!this.props.board) return <div>Loading...</div>
        return (
            <>
                {this.state.status.map(status =>
                    <div className="col-md-4" key={status._id}>
                        <div className="well-box feature-block">
                            <div className="feature-icon">
                                <h6>{status.status}</h6>

                                <Button
                                    key={status._id}
                                    onClick={() => this.handleToDoAdd(status._id)}
                                    variant=""
                                    type="submit"
                                    className="btn-block btn_add"
                                >
                                    <i className="material-icons" >add</i>
                                </Button><br />

                                {this.state.modalShow === true ?
                                    <ManageToDo
                                        show={this.state.modalShow}
                                        onHide={this.modalClose}
                                        user={this.props.user}
                                        modalClose={this.modalClose}
                                        getToDos={this.getToDos}
                                        todo={this.state.todos}
                                        statusid={this.state.statusId}
                                    /> : ''
                                }
                                <div className="todo_item">
                                    <ListItem board={this.props.board} status={status._id} user={this.props.user} getToDos={this.getToDos} todo={this.state.todos} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

export default withRouter(StatusList)