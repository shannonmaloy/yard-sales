import React, {useState, useRef} from "react" 
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer} from "@react-google-maps/api"

const Map = (props) => {
  
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null)
  const [center, setCenter] = useState({  lat: 33.860649, lng: -84.339790 });
  const [zoom, setZoom] = useState(10);
  const [searchDistance, setSearchDistance] = useState(3)
  
  const mapRef = useRef(null);
  const filteredSearch = []
  const libraries = ["geometry"]
  //Google Map options setup 
  const mapContainerStyle = {
    height: "50vh",
    width: "50vw",
    clickableIcons: false
  }
  //File path for map cluster icons
  const markerClusterOptions = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  } 
  //Script to load API key.  API key is URL restricted
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCXK1LZV_v4jMsN0dqc4ooplYep9-lT64g"
  })
  console.log("Search Distance", searchDistance)
  if (loadError) return "Error"
  if (!isLoaded) return "Loading Map!"
  

  /*  Important Function: Determines the bounds of the rendered map based on the search results and distance.  
      This function determines the distance from the users input to each sale then determines 
      if the sale should be mapped...
      
  */
  const searchResultsAndFitBoundMap = map => {
    
    const bounds = new google.maps.LatLngBounds();
    props.mapData.map(place => {
      console.log("Sale ID: ", place.id, "Lat/Lng: ", { lat: parseFloat(place.lat), lng: parseFloat(place.lng) })
      let distanceInMiles = distance(place.lat, place.lng, center.lat, center.lng)
      console.log("Distance from center: ", distanceInMiles, parseFloat(searchDistance))
      if( distanceInMiles < searchDistance) {
        bounds.extend({  lat: parseFloat(place.lat), lng: parseFloat(place.lng) })
        console.log(bounds.toJSON());
        filteredSearch.push(place)
      }
    });
    mapRef.current.fitBounds(bounds)
  };

  //Haversine Formula for calculating distance between two lat/lng coordinates
  function distance(lat1, lng1, lat2, lng2) {
    const p = 0.017453292519943295    // Math.PI / 180 convert degrees to radians
    const c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lng2 - lng1) * p)) / 2
  
    return 7917.6 * Math.asin(Math.sqrt(a)); // 7917.6 = 2 * R; R = 3958.8 radius of Earth in miles
  }

  function handleLoad(map) {
    mapRef.current = map
    console.log("Map here", map)
    searchResultsAndFitBoundMap()
    
  }

  const handleCenterChanged = () => {
    if (!mapRef.current) return
      const newPos = mapRef.current.getBounds().toJSON()
      console.log(newPos)
  }

  function geocodeAddress(saleMarker) {
    let address = `${saleMarker.address}, ${saleMarker.city},${saleMarker.state} ${saleMarker.zip}` 
    console.log("Hello", address)
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address: address }, (results, status) => {
      console.log("Hello geocoded address", status, "Then ", results[0].geometry.location.toJSON())
      
    })
    
  }
  //This is where the magic happens!  This funciton renders the Map, map Markers, map MarkerClusters, and InfoWindows
  const renderMap = () => {
    
      return (
        <div>
          <GoogleMap
            // onLoad={alert("LOADED")}
            onLoad={handleLoad}
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={zoom} 
            center={center}
            onClick={e => console.log(e.latLng.toJSON())}
            onCenterChanged={(handleCenterChanged)}
            clickableIcons={false}
          >
            {/* child components go here - Marker, InfoWindow */}
            <MarkerClusterer options={markerClusterOptions} minimumClusterSize={3}>
              {(clusterer) =>
                filteredSearch.map((saleMarker) => (
              <Marker
                options={{animation: google.maps.Animation.DROP}}
                key={saleMarker.id}
                icon={{
                  url: "/house-favicon.png",
                  scaledSize: new window.google.maps.Size(20, 20),
                }}
                position={{
                  lat: parseFloat(saleMarker.lat),
                  lng: parseFloat(saleMarker.lng),
                }}
                onClick={e => geocodeAddress(saleMarker)}
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
              options={{pixelOffset: new google.maps.Size(0,-20)}}
                position={{
                  lat: parseFloat(selectedSale.lat),
                  lng: parseFloat(selectedSale.lng),
                }}
                
                onCloseClick={() => {
                  setSelectedSale(null)
                }}>
                <div>
                  <h3>{selectedSale.address}</h3>
                  <h4>{selectedSale.city}, {selectedSale.state} {selectedSale.zip}</h4>
                  <p>{selectedSale.description}</p>
                </div>
              </InfoWindow>)}
            
          </GoogleMap>
        

            {/* Position of the user's map click */}
            {clickedLatLng && (
              <h3>
                You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
              </h3>
            )}

            {/* Position of the user's map click */}
            {selectedSale && <h3>Selected Marker: {selectedSale.address}</h3>}
        </div>
      )
      }

  
  //Loads map
  return isLoaded ? renderMap() : "Loading Map";


}

export default Map


  