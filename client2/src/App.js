import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Home from "./Home"
import Dashboard from "./Dashboard"
import SplashPage from "./SplashPage"
import Header from "./Header"
import Footer from "./Footer"
import PostSale from "./PostSale"
import FindSales from "./FindSales"
import './App.css'

console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: "Not_Logged_In",
      user: {},
      redirect: "/login",
    }
    
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  componentDidMount() {
    this.checkLoginStatus()  
  }

  checkLoginStatus() {
    axios.get("/logged_in", { withCredentials: true })
      .then(res => {
        if (res.data.logged_in && this.state.loggedInStatus === "Not_Logged_In") {
          this.setState({
            loggedInStatus: "Logged_In",
            user: res.data.user,
            redirect: null,
          })
        } else if (!res.data.logged_in && this.state.loggedInStatus === "Logged_In") {
          this.setState({
            loggedInStatus: "Not_Logged_In",
            user: {},
            redirect: "/login"
          })
        }
      }).catch(err => {
        console.log("check login...", err)
      })
  }

  

  handleLogin(data) {
    this.setState({
      loggedInStatus: "Logged In",
      user: data.user,
      redirect: null,
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "Not_Logged_In",
      user: {},
      redirect: '/login'
    })
    this.props.history.push('/login')
  }

  
 
  render() {
    return (
      <div className="main">
        <BrowserRouter>
          <Header loggedInStatus={this.state.loggedInStatus} user={this.state.use} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>
          <div className='main-area'>
          <Switch>
            
            <Route exact path={"/"} component={SplashPage}/>
            <Route exact path={"/dashboard"} render={props => (<Dashboard {...props} loggedInStatus={this.state.loggedInStatus} user={this.state.user}/>)} />
            <Route exact path={"/sales"} render={() => <FindSales />} />
            <Route exact path={"/sales/new"} render={props => (<PostSale {...props} redirect={this.state.redirect} loggedInStatus={this.state.loggedInStatus} user={this.state.user}/>)} />
            <Route exact path={"/sales/:id"} render={props => (<PostSale {...props} redirect={this.state.redirect} loggedInStatus={this.state.loggedInStatus} user={this.state.user}/>)} />
            <Route exact path={"/login"} render={props => (<Home {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin} handleLogout={this.handleLogout} />)} />
            <Route exact path={"/registration"} render={props => (<Home {...props} loggedInStatus={this.state.loggedInStatus} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>)} />
            
            </Switch>
            </div>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
