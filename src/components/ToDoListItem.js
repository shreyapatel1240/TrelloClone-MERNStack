import React, { Component } from 'react'
import StatusList from './StatusList'
import { withRouter } from 'react-router'
// import { Button } from 'react-bootstrap/lib'
import ManageToDo from './ManageToDo'

class ToDoListItem extends Component {
    state = {
        modalShow: false
    }

    handleToDoAdd = () => {
        this.setState({
            modalShow: true
        })
    }

    modalClose = () => {
        this.setState({ modalShow: false })
    }

    render() {
        if (!this.props.match) return <div>Loading...</div>
        return (
            <>
                <div className='row'>
                    <StatusList board={this.props.match.params.boardId} user={this.props.user} />
                </div>
                {this.state.modalShow === true ?
                    <ManageToDo
                        show={this.state.modalShow}
                        onHide={this.modalClose}
                        user={this.props.user}
                        modalClose={this.modalClose}
                        getToDos={this.modalClose}
                    /> : ''
                }
            </>
        )
    }
}

export default withRouter(ToDoListItem)