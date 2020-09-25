import React, { useEffect, useState } from 'react';
import Map from './Map'
import axios from 'axios'

const Sales = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3001/sales')
      .then(res => {
        setData(res.data.sales)
      });
  }, [])

  return (
    <div className="sale-container">
      {console.log(data)}
      {data ? (<Map mapData={data} />) : <p>Loading Google Map</p>}
      {data ? (
        data.map((sale) => {
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Sales;