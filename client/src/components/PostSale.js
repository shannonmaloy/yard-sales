import React, { Component } from 'react'
import axios from 'axios'

export default class PostSale extends Component {
    constructor(props) {
        super(props)

        this.state = {
            address: "",
            city: "",
            state: "",
            zip: "",
            date: "",
            start_time: "",
            end_time: "",
            description: "",

            registrationErrors: "",
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
            address, city, state, zip, date, start_time, end_time, description, payment_type, lat, lng, user_id
        } = this.state
        axios.post("http://localhost:3001/sales", {
        
                address: address,
                city: city,
                state: state,
                zip: zip,
                date: date,
                start_time: start_time,
                end_time: end_time,
                description: description,
                payment_type: payment_type,
                lat: lat,
                lng: lng,
                user_id: 5
            
        }, { withCredentials: true }
        ).then(res => {
            if (res.data.status === "created")
            this.props.handleSuccessfulAuth(res.data)
        }).catch(err => {
            console.log("registration error", error)
        })
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
        
                    <input type="text" name="address" placeholder="Address (optional)" value={this.state.address} onChange={this.handleChange} required/>
                    <input type="text" name="city" placeholder="City (optional)" value={this.state.city} onChange={this.handleChange} required/>
                    <input type="text" name="state" placeholder="State (optional)" value={this.state.state} onChange={this.handleChange} required/>
                    <input type="text" name="zip" placeholder="Zip (optional)" value={this.state.zip} onChange={this.handleChange} required/>
                    <input type="date" name="date" placeholder="Date" value={this.state.date} onChange={this.handleChange} required />
                    <input type="time" name="start_time" placeholder="Start Time" value={this.state.start_time} onChange={this.handleChange} required />
                    <input type="time" name="end_time" placeholder="End Time" value={this.state.end_time} onChange={this.handleChange} required />
                        {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label for="vehicle1"> Cash</label>
                        <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"/>
                        <label for="vehicle2"> Venmo</label>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/>
                        <label for="vehicle3"> Paypal</label> */}
                    <input type="textarea" name="description" placeholder="Enter a brief description of items being sold or any important info" value={this.state.description} onChange={this.handleChange} required />
                    <button type="submit">Post A Sale!</button>
                </form>
            </div>
        )
    }
}
