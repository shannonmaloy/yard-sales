import React, { Component} from 'react'
import Sales from "./Sales"
import Map from "./Map"
import axios from 'axios'
import Example from "./Example"
import {Autocomplete, LoadScript} from '@react-google-maps/api'
export default class FindASale extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            searchBarInput: "", 
            searchRadius: 20, //search bar input
            allSales: null,
            filteredSales: null,
            geocodedSearchBarInput: null,
            center: { lat: 33.860649, lng: -84.339790 },
            zoom: 11,
            bounds: null,
           
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.geocodeSearchBarInput = this.geocodeSearchBarInput.bind(this)
        
    }
    
    getData = () => {
        axios.get('http://localhost:3001/sales')
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
        const geocoder = new google.maps.Geocoder()
        console.log(map)
        geocoder.geocode({ address: searchBarInput }, (results, status) => {
            console.log("Hello geocoded address", status, "Then ", results[0].geometry.location.toJSON())
            this.setState({ geocodedSearchBarInput: results[0].geometry.location.toJSON() }, () => {
                this.filterData()
            })
        })
    }

    filterData = () => {
        let filteredSalesArr = []
        this.setState({bounds: null})
        const bounds = new google.maps.LatLngBounds() 
        this.state.allSales.map(place => {
            console.log("Sale ID: ", place.id, "Lat/Lng: ", { lat: parseFloat(place.lat), lng: parseFloat(place.lng) }, "Geocode Result:", this.state.geocodedSearchBarInput.lat)
            let distanceInMiles = this.distance(place.lat, place.lng, this.state.geocodedSearchBarInput.lat, this.state.geocodedSearchBarInput.lng)
            console.log("Distance from center: ", distanceInMiles, this.state.searchRadius)
            if (distanceInMiles < this.state.searchRadius) {
                bounds.extend({  lat: parseFloat(place.lat), lng: parseFloat(place.lng) })
                console.log(bounds.toJSON());
                filteredSalesArr.push(place)
            }
        })
        
        
        this.setState({
            filteredSales: filteredSalesArr,
            bounds: bounds
        }) 
        console.log("Seeting fiteredData State", filteredSalesArr, "BOUNDS", this.state.bounds)
    };
    
    
       
    componentDidMount() {
        this.getData()
        
    }

    render() {
      
        
        return (
            <div>
                <LoadScript
                libraries = {["places"]}
                googleMapsApiKey="AIzaSyCXK1LZV_v4jMsN0dqc4ooplYep9-lT64g"
            >
                
                <form onSubmit={this.handleSubmit}>
                <input type="text" name="searchBarInput" placeholder="Enter an address, city, or ZIP code" value={this.state.searchBarInput} onChange={this.handleChange} />
                <input type="number" name="searchRadius" placeholder="Enter radius in miles" value={this.state.searchRadius} onChange={this.handleChange} />
                    <button type="submit">Search</button>
                </form>
                {this.state.filteredSales ? (<Map dataProps={this.state}/>) : (this.state.allSales ? (<Map dataProps={this.state}/>) : (<p>Loading Google Map</p>))}

                {<Sales dataProps={this.state}/>}
                    {/* {<Example dataProps={this.state}/>} */}
            </LoadScript>
            </div>
        )
    }

}