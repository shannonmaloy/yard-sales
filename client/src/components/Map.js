import React, {useState, useRef} from "react" 
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer} from "@react-google-maps/api"

const Map = (props) => {
  
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null)
  const mapRef = useRef(null);
  
  const libraries = ["geometry"]
  let salesData = null
  if (props.dataProps.filteredSales) {
   salesData = props.dataProps.filteredSales
  } else salesData = props.dataProps.allSales
  console.log(salesData, "DATADADADA")

  //Google Map options setup 
  const mapContainerStyle = {
    height: "50vh",
    width: "50vw",
    clickableIcons: false
  }
  //File path for map cluster icons
  // const markerClusterOptions = {
  //   imagePath:
  //     'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  // } 
  //Script to load API key.  API key is URL restricted
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCXK1LZV_v4jMsN0dqc4ooplYep9-lT64g"
  })
  
  if (loadError) return "Error"
  if (!isLoaded) return "Loading Map!"
  

  /*  Important Function: Determines the bounds of the rendered map based on the search results and distance.  
      This function determines the distance from the users input to each sale then determines 
      if the sale should be mapped...
      
  */
  const searchResultsAndFitBoundMap = map => {
  
   
    (props.dataProps.bounds && mapRef.current.fitBounds(props.dataProps.bounds))
    console.log("Props in Maps:", props)
  }

  function handleLoad(map) {
    mapRef.current = map
    console.log("Map here", map)
    searchResultsAndFitBoundMap()
    
  }

  //Possible Future feature - on map change reload data to current bounds
  // const handleCenterChanged = () => {
  //   if (!mapRef.current) return
  //     const newPos = mapRef.current.getBounds().toJSON()
  //     console.log(newPos)
  // }

  //This is where the magic happens!  This funciton renders the Map, map Markers, map MarkerClusters, and InfoWindows
  const renderMap = () => {
    
      return (
        <div>
          {console.log("Hello before map render", props)}
          <GoogleMap
            // onLoad={alert("LOADED")}
            onLoad={handleLoad}
            id="map"
            mapContainerStyle={mapContainerStyle}
            zoom={props.dataProps.zoom} 
            center={props.dataProps.center}
            onClick={e => console.log(e.latLng.toJSON())}
            // onCenterChanged={(handleCenterChanged)}
            clickableIcons={false}
          >
            {/* child components go here - Marker, InfoWindow */}
            <MarkerClusterer  minimumClusterSize={3}>
              {(clusterer) =>
                salesData.map((saleMarker) => (
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


  