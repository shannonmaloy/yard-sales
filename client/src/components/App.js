import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Home from "./Home"
import Dashboard from "./Dashboard"
import Sales from "./Sales"
import Map from "./Map"
import Header from "./Header"
import Footer from "./Footer"


console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: "Not_Logged_In",
      user: {}

    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  componentDidMount() {
    this.checkLoginStatus()  
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

  

  handleLogin(data) {
    this.setState({
      loggedInStatus: "Logged In",
      user: data.user
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "Not_Logged_In",
      user: {}
    })
  }


  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Header loggedInStatus={this.state.loggedInStatus} user={this.state.use} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path={"/"} render={props => (<Home {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>)} />
            <Route exact path={"/dashboard"} render={props => (<Dashboard {...props} loggedInStatus={this.state.loggedInStatus} user={this.state.user}/>)} />
            <Route exact path={"/sales"} render={() => <Sales />} />
            <Route exact path={"/sales/post"} render={() =><Sales/>} />
          </Switch>
        <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
