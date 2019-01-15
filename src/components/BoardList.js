import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../services/tokenService'
import { Card, Button } from 'react-bootstrap/lib'
import ManageBoard from './ManageBoard'

export default class BoardList extends Component {
    state = {
        board: [],
        modalShow: false
    }

    componentDidMount = () => {
        this.getBoards()
    }

    getBoards = async () => {
        const token = getToken()
        try {
            const board = await axios.get(`/board`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            this.setState({ board: board.data.payload })
        }
        catch (e) {
            console.log(e)
        }
    }

    handleBoard = () => {
        this.setState({
            modalShow: true
        })
    }

    modalClose = () => {
        this.setState({ modalShow: false })
    }

    render() {
        if (!this.state) return <h2>Loading...</h2>
        return (
            <>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleBoard}
                >
                    Add Board
                </Button><br /><br />
                {this.state.modalShow === true ?
                    <ManageBoard
                        show={this.state.modalShow}
                        onHide={this.modalClose}
                        user={this.props.user}
                        modalClose={this.modalClose}
                        getBoards={this.getBoards}
                    /> : ''
                }
                <div className='row'>
                    {this.state.board.map(board =>
                        <div className="col-md-4" key={board._id}>
                            <div className="well-box feature-block">
                                <div className="feature-icon">
                                    <Card>
                                        <Card.Header className="text-center">
                                            <Link to={`/todo/${board._id}`}><h5>{board.title}</h5></Link>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text>
                                                {board.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }
}