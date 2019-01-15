import React, { Component } from "react"
import axios from "axios"
import { Modal, Button, Form } from 'react-bootstrap/lib'
import { setToken } from '../services/tokenService'

class SignUp extends Component {
    state = {
        firstName: "",
        lastName: "",
        userName: "",
        password: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { firstName, lastName, userName, password } = this.state
        try {
            const res = await axios.post('/user', { firstName, lastName, userName, password })
            setToken(res.data.token)
            this.props.setUser(res.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="firstName">
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                    autoFocus={true}
                                />
                            </Form.Group>
                            <Form.Group controlId="lastName">
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="userName">
                                <Form.Control
                                    type="text"
                                    placeholder="User Name"
                                    value={this.state.userName}
                                    onChange={this.handleChange}
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

                    <Modal.Footer>
                        <Button onClick={this.handleSubmit} variant="primary" type="submit" className="btn-block">Sign Up</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </>
        );
    }
}

export default SignUp;
