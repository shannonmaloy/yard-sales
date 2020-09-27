import React, { useEffect, useState } from 'react';
import Map from './Map'
import axios from 'axios'

const Sales = (props) => {
  const [data, setData] = useState(null);
  console.log("Sales is updating...")
  let test = null
  let onLoadData = props.dataProps.data
  let filteredData = props.dataProps.filteredData
  if (filteredData) {
    test = filteredData
  } else if (onLoadData) {
    test = onLoadData
  }
  return (
    <div className="sale-container">
      {console.log(props)}
      {filteredData ? (<Map mapData={filteredData} dataProps={props}/>) : (onLoadData ? (<Map mapData={onLoadData} dataProps={props}/>) : (<p>Loading Google Map</p>))}
      {filteredData ? (
        filteredData.map((sale) => {
          return (
            <div className="sale" key={sale.id}>
                  <h3>{sale.address}, {sale.city}, {sale.state} {sale.zip}</h3>
                  <p>{sale.description}</p>
                  <p>Date & Time: {sale.date}</p>
              <p>{sale.start_time} to {sale.end_time}</p>
              {/* <p>Lat: {sale.lat} Long: {sale.lng}</p> */}
            </div>
          );
        })
      ) : (onLoadData ? (onLoadData.map((sale) => {
        return (
          <div className="sale" key={sale.id}>
                <h3>{sale.address}, {sale.city}, {sale.state} {sale.zip}</h3>
                <p>{sale.description}</p>
                <p>Date & Time: {sale.date}</p>
            <p>{sale.start_time} to {sale.end_time}</p>
            {/* <p>Lat: {sale.lat} Long: {sale.lng}</p> */}
          </div>
        );
      })
    ) :
        <p>Loading Search Results...</p>
      )}
    </div>
  )
}

export default Sales;