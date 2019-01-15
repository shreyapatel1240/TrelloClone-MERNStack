import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap/lib'
import axios from 'axios';
import { setToken } from "../services/tokenService";

export default class Login extends Component {
    state = {
        userName: "",
        password: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = async e => {
        e.preventDefault()
        try {
            const { userName, password } = this.state
            const res = await axios.post('/login', { userName, password })
            const token = res.data.token
            setToken(token)
            this.props.getCurrentUser()
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div>
                <Modal.Dialog className="login_dialog">
                    <Modal.Header className="login_header">
                        <Modal.Title>
                            <i className="material-icons login">lock</i>
                            <br />
                            Login
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="userName">
                                <Form.Control
                                    type="text"
                                    placeholder="User Name"
                                    value={this.state.userName}
                                    onChange={this.handleChange}
                                    autoFocus={true}
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer className="btns">
                        <Button onClick={this.handleSubmit} variant="primary" type="submit" className="btn-block">Login</Button>
                    </Modal.Footer>
                    <Modal.Footer>
                        <Button
                            variant=""
                            href="/signup"
                            className="btn-block btn_add"
                        >
                            Create New Account
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}