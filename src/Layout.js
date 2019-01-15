import React, { Component } from 'react'
import { Nav } from 'react-bootstrap/lib'
import { removeToken } from './services/tokenService'

export default class Layout extends Component {
    state = {
        user: null,
        stateText: 'Login'
    }

    componentDidMount = () => {
        if (this.props && this.props.user) {
            this.setState({
                user: this.props.user,
                stateText: 'Logout'
            })
        }
    }


    handleLogout = async () => {
        removeToken()
        this.props.setUser(null)
    }

    render() {
        const {
            children
        } = this.props;

        return (
            <>
                <Nav className="navbar navbar-dark bg-dark">
                    <Nav.Item>
                        <Nav.Link href="/board" className="navbar-brand">ToDo App</Nav.Link>

                    </Nav.Item>
                    <span className="navbar-text">
                        <Nav.Link href="/" className="navbar-brand" onClick={this.handleLogout}>{this.state.stateText}</Nav.Link>
                    </span>
                </Nav>
                <main>
                    <div className='container-fluid'>
                        {children}
                    </div>
                </main>
            </>
        )
    }
}