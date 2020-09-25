import React, {useState, useRef} from "react" 
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer} from "@react-google-maps/api"
import Sales from './Sales'

const Map = (props) => {
const mapRef = useRef(null);
const libraries = ["geometry"]
const mapContainerStyle = {
  height: "50vh",
  width: "50vw",
  clickableIcons: false
}

const markerClusterOptions = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
} 
const [clickedLatLng, setClickedLatLng] = useState(null);
const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null)
  // const [fitBounds, setFitBounds] = useState(null)
  const [center, setCenter] = useState({  lat: 33.860649, lng: -84.339790 });
  const [zoom, setZoom] = useState(10);
  // const [mapRef, setMapRef] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCXK1LZV_v4jMsN0dqc4ooplYep9-lT64g"
  })

  if (loadError) return "Error"
  if (!isLoaded) return "Loading Map!"

  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();
    props.mapData.map(place => {
      console.log(place.lat)
      bounds.extend((place.lat, place.lng));
      return place.id;
    });
    map.fitBounds(bounds);
  };
  
  const loadHandler = map => {
    // Store a reference to the google map instance in state
    setMapRef(map);
    // Fit map bounds to contain all markers
    fitBounds(map);
  };
  // We have to create a mapping of our places to actual Marker objects

  function handleLoad(map) {
    mapRef.current = map
    console.log(mapRef.current)
  }

  function handleCenterChanged() {
    if (!mapRef.current) return
    const newPos = mapRef.current.getCenter().toJSON()
    console.log(newPos)
  }

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
        onCenterChanged={handleCenterChanged}
         
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
            // onClick={() => {
            //   setSelectedSale(saleMarker)
            // }}
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
      {/* Our center position always in state */}
      <h3>
        Center  {center.lat}, {center.lng}
        </h3>

        {/* Position of the user's map click */}
        {clickedLatLng && (
          <h3>
            You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
          </h3>
        )}

        {/* Position of the user's map click */}
        {selectedSale && <h3>Selected Marker: {selectedSale.address}</h3>}
    </div>
  );
  }

  return isLoaded ? renderMap() : "Loading Map";
}

export default Map


  