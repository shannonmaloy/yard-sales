import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Home from "./Home"
import Dashboard from "./Dashboard"


export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: "Not_Logged_In",
      user: {}

    }

    this.handleLogin = this.handleLogin.bind(this)

  }

  checkLoginStatus() {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(res => {
        console.log("logged in?", res)
        if (res.data.logged_in && this.state.loggedInStatus === "Not_Logged_In") {
          this.setState({
            loggedInStatus: "Logged_In",
            user: res.data.user
          })
        } else if (!res.data.logged_in && this.state.loggedInStatus === "Logged_In") {
          this.setState({
            loggedInStatus: "Not_Logged_In",
            user: {}
          })
        }
      }).catch(err => {
        console.log("check login", err)
      })
  }

  componentDidMount() {
    this.checkLoginStatus()  
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "Logged In",
      user: data.user
    })
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} render={props => (<Home {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin}/>)} />
            <Route exact path={"/dashboard"} render={props => (<Dashboard {... props} loggedInStatus={this.state.loggedInStatus}/>)} />

          </Switch>
        
        </BrowserRouter>
      </div>
    );
  }
}
