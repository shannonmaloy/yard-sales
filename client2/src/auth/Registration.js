import React, { Component } from 'react'
import axios from 'axios'

export default class Registration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            registrationErrors: ""
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
        console.log("Submit Clicked")
        const {
            email,password, password_confirmation, address, city, state, zip
        } = this.state
        axios.post("/registrations", {
            user: {
                email: email,
                password: password,
                password_confirmation: password_confirmation,
                address: address,
                city: city,
                state: state,
                zip: zip
            }
        }, { withCredentials: true }
        ).then(res => {
            if (res.data.status === "created")
            
            this.props.handleSuccessfulAuth(res.data)
        }).catch(err => {
            console.log("registration error", err)
        })
        event.preventDefault()
    }

    render() {
        return (
            <div className='register-container'>
                <form onSubmit={this.handleSubmit}>
                    <p>Sign-up With Yard Sale!</p>
                    <input type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                    <input type="password" name="password_confirmation" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required />
                    <input type="text" name="address" placeholder="Address (optional)" value={this.state.address} onChange={this.handleChange} />
                    <input type="text" name="city" placeholder="City (optional)" value={this.state.city} onChange={this.handleChange} />
                    <input type="text" name="state" placeholder="State (optional)" value={this.state.state} onChange={this.handleChange} />
                    <input type="text" name="zip" placeholder="Zip (optional)" value={this.state.zip} onChange={this.handleChange} />
                    
                    <button className="register-button" type="submit">Register</button>
                </form>
            </div>
        )
    }
}