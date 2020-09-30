import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { LoadScript} from '@react-google-maps/api'


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
            minDate: moment().format("YYYY-MM-DD"),
            geoCodedAddress: null,
            registrationErrors: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.postSale = this.postSale.bind(this)
    }

    componentDidMount() {
        if (this.props.match.params.id) { this.getEditData() } 
      }
    
    getEditData = () => {
        axios.get(`/sales/${this.props.match.params.id}`)
            .then(res => {
                
                this.setState({ 
                    address: res.data.sale.address,
                    city: res.data.sale.city,
                    state: res.data.sale.state,
                    zip: res.data.sale.zip,
                    date: res.data.sale.date,
                    start_time: res.data.sale.start_time,
                    end_time: res.data.sale.end_time,
                    description: res.data.sale.description,
                } )
            }).catch(err => {
                console.log("check login", err)
            }) 
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
        let addressToGeocode = this.state.address + "," + this.state.city + "," + this.state.state + " " + this.state.zip
        event.preventDefault()
        this.geocodeSaleData(addressToGeocode)  
    }

    geocodeSaleData = (addressToGeocode) => {
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ address: addressToGeocode }, (results, status) => {
            this.setState({
                geoCodedAddress: results[0].geometry.location.toJSON(),
                lat: results[0].geometry.location.toJSON().lat,
                lng: results[0].geometry.location.toJSON().lng
            }, () => {
                    { this.props.match.params.id ? this.updateSale() : this.postSale() }
                    return <Redirect to='/dashboard' />
            })
        })
    }
    
    postSale() {
        axios.post("/sales", {
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            date: this.state.date,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
            description: this.state.description,
            payment_type: this.state.payment_type,
            lat: this.state.lat,
            lng: this.state.lng,
            user_id: this.props.user.id
        
        }, { withCredentials: true }
        ).then(res => {
            this.props.history.push("/dashboard")
            }).catch(err => {
        console.log("posting error", err)
    })
    }

    updateSale() {
        axios.put(`/sales/${this.props.match.params.id}`, {
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            date: this.state.date,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
            description: this.state.description,
            payment_type: this.state.payment_type,
            lat: this.state.lat,
            lng: this.state.lng,
        }, { withCredentials: true }
        ).then(res => {
            this.props.history.push("/dashboard")
            }).catch(err => {
        console.log("posting error", err)
    })
    }

    render() {
        if (this.props.redirect) {
            return <Redirect to={this.props.redirect} />
          }
        return (
            <div>
                <LoadScript
                googleMapsApiKey="AIzaSyCXK1LZV_v4jMsN0dqc4ooplYep9-lT64g"
                >
                    {(this.props.match.params.id >= 0) ? (<h1>Update Your Yard Sale Information</h1>) : <h1>Post Your Yard Sale!</h1>}  
                <form onSubmit={this.handleSubmit}>
                    
                    <input type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.handleChange} required/>
                    <input type="text" name="city" placeholder="City" value={this.state.city} onChange={this.handleChange} required/>
                    <input type="text" name="state" placeholder="State" value={this.state.state} onChange={this.handleChange} required/>
                    <input type="text" name="zip" placeholder="Zip" value={this.state.zip} onChange={this.handleChange} pattern="[0-9]{5}" required/>
                    <input type="date" name="date" placeholder="Date" value={this.state.date} onChange={this.handleChange} min={this.state.minDate} required />
                    <input type="time" name="start_time" placeholder="Start Time" value={this.state.start_time} step="600" onChange={this.handleChange} required />
                    <input type="time" name="end_time" placeholder="End Time" value={this.state.end_time} step="600" onChange={this.handleChange} required />
                        {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                        <label for="vehicle1"> Cash</label>
                        <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"/>
                        <label for="vehicle2"> Venmo</label>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/>
                        <label for="vehicle3"> Paypal</label> */}
                    <input type="textarea" name="description" placeholder="Enter a brief description of items being sold or any important info" value={this.state.description} onChange={this.handleChange} required />
                    <button type="submit">{this.props.match.params.id ? "Update Info" : "Post A Sale!"}</button>
                        </form>
                        </LoadScript>
            </div>
        )
    }
}
