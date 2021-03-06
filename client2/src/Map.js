import React, {useState, useRef, useEffect} from "react" 
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer} from "@react-google-maps/api"
import moment from 'moment'
require("dotenv").config({ path: "../.env" })

const Map = (props) => {
  const [selectedSale, setSelectedSale] = useState(null)
  
  const mapRef = useRef(null);

  let salesData = []
  if (props.dataProps.filteredSales) {
    salesData = props.dataProps.filteredSales
  } else { salesData = props.dataProps.allSales }
  
  useEffect(() => {
    if (props.dataProps.centerChange){
      mapRef.current.panTo({ lat: props.dataProps.centerChange.lat, lng: props.dataProps.centerChange.lng })
  }
 }, [props.dataProps.centerChange])

  //Google Map options setup 
  const mapContainerStyle = {
    height: "inherit",
    width: "inherit",
    clickableIcons: false
  }
  //File path for map cluster icons
  // const markerClusterOptions = {
  //   imagePath:
  //     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  // } 
  //Script to load API key.  API key is URL restricted
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })
  
  if (loadError) return "Error"
  if (!isLoaded) return "Loading Map!"
  

  /*  Important Function: Determines the bounds of the rendered map based on the search results and distance.  
      This function determines the distance from the users input to each sale then determines 
      if the sale should be mapped...
  */
  const searchResultsAndFitBoundMap = () => {
    if (props.dataProps.filteredData){
    const bounds = new window.google.maps.LatLngBounds();
    props.dataProps.filteredData.map(place => {
        bounds.extend({  lat: parseFloat(place.lat), lng: parseFloat(place.lng) })
      })
      return mapRef.current.fitBounds(bounds)
    }
  }

  const handleLoad = (map) => {
    mapRef.current = map
    searchResultsAndFitBoundMap(map)
  }
  
  //Possible Future feature - on map change reload data to current bounds
  // const handleCenterChanged = () => {
  //   if (!mapRef.current) return
  //     const newPos = mapRef.current.getBounds().toJSON()
  //     console.log(newPos)
  // }
  
  if (props.dataProps.bounds) {
    mapRef.current.fitBounds(props.dataProps.bounds)
    props.dataProps.bounds = null
  }
  //This is where the magic happens!  This function renders the Map, map Markers, map MarkerClusters, and InfoWindows
  const renderMap = () => {
  
      return (
        <div className="map-border">
          <GoogleMap
            
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={props.dataProps.zoom} 
            center={props.dataProps.center}
            // onClick={e => console.log(e.latLng.toJSON())}
            // onCenterChanged={(handleCenterChanged)}
            clickableIcons={false}
            onLoad={handleLoad}
          >
            {/* child components go here - Marker, InfoWindow */}
            <MarkerClusterer  minimumClusterSize={2}>
              {(clusterer) =>
                salesData.map((saleMarker) => (
              <Marker
                options={{animation: window.google.maps.Animation.DROP}}
                key={saleMarker.id}
                icon={{
                  url: "./house-favicon.png",
                  scaledSize: new window.google.maps.Size(20, 20),
                }}
                position={{
                  lat: parseFloat(saleMarker.lat),
                  lng: parseFloat(saleMarker.lng),
                }}
                onClick={e => console.log("MODAL FUNCTION HERE")}
                onMouseOver={() => {
                  setSelectedSale(saleMarker)
                }}
                onMouseOut={() => {
                  setSelectedSale(null)
                }}
                clusterer={clusterer}
              />
            ))}
            </MarkerClusterer>
            
            {selectedSale && (
              <InfoWindow
              options={{pixelOffset: new window.google.maps.Size(0,-20)}}
                position={{
                  lat: parseFloat(selectedSale.lat),
                  lng: parseFloat(selectedSale.lng),
                }}
                
                onCloseClick={() => {
                  setSelectedSale(null)
                }}>
                <div className='info-window'>
                  <p className="sale-window-address1">{selectedSale.address}</p>
                  <p className="sale-window-address2">{selectedSale.city}, {selectedSale.state} {selectedSale.zip}</p>
                  <p className="sale-window-date"><span className="bold">Date:</span> {moment(selectedSale.date).format("MM-DD-YYYY")} </p>
                  <p className="sale-window-time"><span className="bold">Time: </span>{moment(selectedSale.start_time).utcOffset(selectedSale.start_time).format("hh:mmA")} to {moment(selectedSale.end_time).utcOffset(selectedSale.start_time).format("hh:mmA")}</p>
                  <p className="sale-window-description">{selectedSale.description}</p>
                </div>
              </InfoWindow>)}
            
          </GoogleMap>
        

            {/* Position of the user's map click */}
            {/* {clickedLatLng && (
              <h3>
                You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
              </h3>
            )} */}

            {/* Position of the user's map click */}
            {/* {selectedSale && <h3>Selected Marker: {selectedSale.address}</h3>} */}
        </div>
      )
      }

  
  //Loads map
  return isLoaded ? renderMap() : "Loading Map";


}

export default Map


  