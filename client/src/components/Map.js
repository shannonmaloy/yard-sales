import React, {useState, useEffect} from "react" 
import { GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api"
import Sales from './Sales'

const libraries = ["geometry"]
const mapContainerStyle = {
  height: "50vh",
  width: "50vw",
}
const center = {
  lat: 33.860649,
  lng: -84.339790,
}

export default function Map(props) {
  const [selectedSale, setSelectedSale] = useState(null)
  const [fitBounds, setFitBounds] = useState(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  

  

  if (loadError) return "Error"
  if (!isLoaded) return "Loading Map!"

  return (
    <div>
      {console.log(props.mapData)}
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        
      >
        {/* child components go here - Marker, InfoWindow */}
        {props.mapData.map((saleMarker) => (
          
          <Marker
            // animation={google.maps.Animation.DROP}
            key={saleMarker.id}
            icon={{
              url: "/house-favicon.png",
              scaledSize: new window.google.maps.Size(20, 20),
              
            }}
            position={{
              lat: parseFloat(saleMarker.lat),
              lng: parseFloat(saleMarker.lng),
            }}
            onClick={() => {
              setSelectedSale(saleMarker)
            }}
            
          /> 
          
        ))}
        
        {selectedSale && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedSale.lat),
              lng: parseFloat(selectedSale.lng),
            }}
            // anchor={selectedSale.id}
            // pixelOffset={(120,20)}
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
    </div>
  );
}



  