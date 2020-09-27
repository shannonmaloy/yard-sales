import React, { Component } from 'react'
import Sales from "./Sales"
import axios from 'axios'
import Example from "./Example"
import {LoadScript} from '@react-google-maps/api'

export default class FindASale extends Component {
    constructor(props) {
    super(props)
    this.state = {
        searchBarInput: "",
        data: null,
        filteredData: null,
        geocodedSearchBarInput: null,

    }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.geocodeSearchBarInput = this.geocodeSearchBarInput.bind(this)
    }

    
    
    getData = () => {
        axios.get('http://localhost:3001/sales')
            .then(res => {
                
                this.setState({ data: (res.data.sales) }
                )
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
        this.setState({ [event.target.name]: event.target.value })
        this.geocodeSearchBarInput(this.state.searchBarInput)
        this.filterData()
        console.log("THIS from FindSale", this)
        console.log(this.state)
        event.preventDefault()
    }
    //Haversine Formula for calculating distance between two lat/lng coordinates
    distance = (lat1, lng1, lat2, lng2) => {
        const p = 0.017453292519943295    // Math.PI / 180 convert degrees to radians
        const c = Math.cos;
        let a = 0.5 - c((lat2 - lat1) * p)/2 + 
                c(lat1 * p) * c(lat2 * p) * 
                (1 - c((lng2 - lng1) * p)) / 2
      
        return 7917.6 * Math.asin(Math.sqrt(a)); // 7917.6 = 2 * R; R = 3958.8 radius of Earth in miles
      }

    filterData = () => {
        let filteredDataArr = []
        this.state.data.map(place => {
          console.log("Sale ID: ", place.id, "Lat/Lng: ", { lat: parseFloat(place.lat), lng: parseFloat(place.lng) }, "Geocode Result:", )
          let distanceInMiles = this.distance(place.lat, place.lng, 33.860649, -84.339790)
          console.log("Distance from center: ", distanceInMiles, this.state.searchBarInput)
          if( distanceInMiles < 10) {
              console.log("Inside 66")
              filteredDataArr.push(place)
          }
        });
        this.setState({filteredData: filteredDataArr})
      };
    
    geocodeSearchBarInput = (searchBarInput) => {
        return new Promise(function (resolve, reject) {
            console.log("Hello", searchBarInput)
            const geocoder = new google.maps.Geocoder()
         
            geocoder.geocode({ address: searchBarInput }, function (results, status) {
                
                if (status === "OK") {
                    console.log("Hello geocoded address", status, "Then ", results[0].geometry.location.toJSON())
                    
                    resolve(this.setState({geocodedSearchBarInput: results[0].geometry.location.toJSON()}))
                } else {
                    reject(new Error("Could not locate " + searchBarInput))
                }
            }.bind(this))
        }.bind(this))
    }
        
      


    componentDidMount() {
        this.getData()
        
    }

    render() {
        console.log(this.state)
        
        return (
            <div>
<LoadScript
        googleMapsApiKey="AIzaSyCXK1LZV_v4jMsN0dqc4ooplYep9-lT64g"
      ></LoadScript>
                <form onSubmit={this.handleSubmit}>
                <input type="text" name="searchBarInput" placeholder="Enter an address, city, or ZIP code" value={this.state.name} onChange={this.handleChange} />
                <button type="submit">Search</button>
                </form>
                {/* <Sales searchBarInput={this.state} /> */}
                {<Example dataProps={this.state}/>}
            </div>
        )
    }

}