import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Layout from './Layout'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import BoardList from './components/BoardList'
import ToDoListItem from './components/ToDoListItem'
import ManageToDo from './components/ManageToDo'
import Login from './components/Login'
import SignUp from './components/SignUp'

import axios from 'axios';
import { getToken } from "./services/tokenService";

class App extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    this.getCurrentUser()
  }

  setUser = user => {
    this.setState({
      user
    })
  }

  getCurrentUser = async () => {
    const token = getToken()
    if (token) {
      try {
        const res = await axios.get('/user/current', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.setUser(res.data)
      }
      catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    // if (!this.state.user) return <p>Loading...</p>
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              this.state.user ? <Redirect to='/board' /> : <Login getCurrentUser={this.getCurrentUser} />
            )}
          />
          <Layout setUser={this.setUser} user={this.state.user}>
            <Switch>
              <Route
                exact
                path='/signup'
                render={() => (
                  this.state.user ? <Redirect to='/' /> : <SignUp setUser={this.setUser} />
                )}
              />
              <Route
                exact
                path='/board'
                render={(props) => (
                  this.state.user ? <BoardList {...props} user={this.state.user} /> : <Redirect to='/' />
                )}
              />
              <Route
                exact
                path='/todo/add'
                render={(props) => (
                  this.state.user ? <ManageToDo {...props} onHide={() => { }} user={this.state.user} /> : <Redirect to='/' />
                )}
              />
              <Route
                exact
                path='/todo/:boardId'
                render={(props) => (
                  this.state.user ? <ToDoListItem {...props} user={this.state.user} /> : <Redirect to='/' />
                )}
              />
              <Route
                path='/todo/update/:todoId'
                render={(props) => (
                  this.state.user ? <ManageToDo {...props} onHide={() => { }} user={this.state.user} /> : <Redirect to='/' />
                )}
              />
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
