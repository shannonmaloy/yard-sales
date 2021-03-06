import React, { Component} from 'react'
import Sales from "./Sales"
import Map from "./Map"
import axios from 'axios'
import { LoadScript } from '@react-google-maps/api'

const libraries = ["places"]
export default class FindASale extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            searchBarInput: "", 
            searchRadius: "", //search bar input
            allSales: null,
            filteredSales: null,
            geocodedSearchBarInput: null,
            center: { lat: 33.860649, lng: -84.339790 },
            zoom: 11,
            bounds: null,
            centerChange: null,
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.geocodeSearchBarInput = this.geocodeSearchBarInput.bind(this)
        this.panToMarker = this.panToMarker.bind(this)
    }
    
    getData = () => {
        axios.get('/sales', { withCredentials: true })
            .then(res => {
                this.setState({ allSales: (res.data.sales) }
                    
                )
            }).catch(err => {
                console.log("check login", err)
            }) 
    }
    
    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value,
            searchRadius: parseFloat(this.state.searchRadius)
        })
        this.geocodeSearchBarInput(this.state.searchBarInput)
        
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //Haversine Formula for calculating distance between two lat/lng coordinates
    distance = (lat1, lng1, lat2, lng2) => {
        const p = 0.017453292519943295    // Math.PI / 180 convert degrees to radians
        const c = Math.cos;
        let a = 0.5 - c((lat2 - lat1) * p) / 2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lng2 - lng1) * p)) / 2
      
        return 7917.6 * Math.asin(Math.sqrt(a)); // 7917.6 = 2 * R; R = 3958.8 radius of Earth in miles
    }
    geocodeSearchBarInput = (searchBarInput) => {
        // console.log("Geo")
        const geocoder = new window.google.maps.Geocoder()
        console.log(window.map)
        geocoder.geocode({ address: searchBarInput }, (results, status) => {
            this.setState({ geocodedSearchBarInput: results[0].geometry.location.toJSON() }, () => {
                this.filterData()
            })
        })
    }

    filterData = () => {
        let filteredSalesArr = []
        this.setState({bounds: null})
        const bounds = new window.google.maps.LatLngBounds() 
        this.state.allSales.map(place => {
            let distanceInMiles = this.distance(place.lat, place.lng, this.state.geocodedSearchBarInput.lat, this.state.geocodedSearchBarInput.lng)
            if (distanceInMiles < this.state.searchRadius) {
                bounds.extend({  lat: parseFloat(place.lat), lng: parseFloat(place.lng) })
                
                filteredSalesArr.push(place)
            }
        })
        this.setState({
            filteredSales: filteredSalesArr,
            bounds: bounds
        }) 
    }
    
    

    panToMarker(lat, lng) {
        console.log("CLICK", lat, lng)
        this.setState({
            centerChange: {
                lat: parseFloat(lat),
                lng: parseFloat(lng),
            }
        })
    }

    saveToProfile = () => {
        fetch(`/api/user/stats/${this.state.currentId}`, {
            method: 'POST',
        })
        .then(res => res.json())
        .then(res => {
            this.setState({
                fireRedirect: true,
                redirectPath: '/user/profile'
            })
            this.getUserSelected();
        }).catch(err => console.log(err))
    }

    componentDidMount() {
        this.getData()
        
    }

    render() {
      
        
        return (
            <div className="find-sales-container">
                <LoadScript
                libraries = {libraries}
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            >
                <div className="search-bar-container">
                <form className="search-bar-form" onSubmit={this.handleSubmit}>
                <input className="search-bar-address" type="text" name="searchBarInput" placeholder="Enter an address, city, or ZIP code" value={this.state.searchBarInput} onChange={this.handleChange} required/>
                            <input className="search-bar-radius" type="number" name="searchRadius" placeholder="Distance (m)" value={this.state.searchRadius} onChange={this.handleChange} min={1} required/>
                    <button className="search-bar-submit" type="submit">Search</button>
                </form></div>
                    <div className="map-container">{this.state.filteredSales ? (<Map dataProps={this.state} />) : (this.state.allSales ? (<Map dataProps={this.state} />) : (<p>Loading Google Map</p>))}</div>

                <div className="sales-list-container">{<Sales dataProps={this.state} panTo={this.panToMarker}/>}</div>
            </LoadScript>
            </div>
        )
    }

}