import React, {useState, useEffect} from "react" 
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer} from "@react-google-maps/api"
import Sales from './Sales'

const libraries = ["geometry"]
const mapContainerStyle = {
  height: "50vh",
  width: "50vw",
  clickableIcons: false
}
const center = {
  lat: 33.860649,
  lng: -84.339790,
}
const markerClusterOptions = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
} 

export default function Map(props) {
  const [selectedSale, setSelectedSale] = useState(null)
  const [fitBounds, setFitBounds] = useState(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCXK1LZV_v4jMsN0dqc4ooplYep9-lT64g"
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
        <MarkerClusterer options={markerClusterOptions} minimumClusterSize={3}>
          {(clusterer) =>
            props.mapData.map((saleMarker) => (
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
            onClick={() => {
              alert("HELP")
            }}
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
    </div>
  );
}



  