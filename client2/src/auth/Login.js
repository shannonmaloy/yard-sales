import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        const {
            email, password
        } = this.state
        axios.post("/sessions", {
            user: {
                email: email,
                password: password
            }
        }, { withCredentials: true }
        ).then(res => {
            console.log("login response", res)
            if (res.data.logged_in)
            this.props.handleSuccessfulAuth(res.data)
        }).catch(err => {
            console.log("login error", err)
        })
        event.preventDefault()
    }

    render() {
        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                    
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}