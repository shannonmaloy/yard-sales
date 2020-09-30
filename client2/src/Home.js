import React, { Component } from 'react'
import axios from 'axios'
import Login from './auth/Login'
import Registration from './auth/Registration'
import {Redirect} from 'react-router-dom'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            path: null
        }
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data)
        this.props.history.push("/dashboard")
    }

    handleLogoutClick() {
        axios.delete("/logout", { withCredentials: true })
            .then(res => {
                this.props.handleLogout()
                return <Redirect to='/' />
            })
            .catch(err => {
            console.log("logout error", err)
        })
    }

    render() {
        return (
            <div>
                
                
                {this.props.location.pathname === '/registration' && <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />}
                {this.props.location.pathname === '/login' && <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />}
                
            </div>
        )
    }
}
