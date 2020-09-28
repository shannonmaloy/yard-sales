import React, { useState } from 'react';
import moment from 'moment'
const Sales = (props) => {
  
  let salesData = null
  if (props.dataProps.filteredSales) {
   salesData = props.dataProps.filteredSales
  } else salesData = props.dataProps.allSales
  
  
  return (
    <div className="sale-container">

      {salesData ? (
        salesData.map((sale) => {
          {console.log(sale.start_time)}
          return (
            
            <div className="sale" key={sale.id}>
              <p className="sale-list-address1">{sale.address}</p> 
              <p className="sale-list-address2">{sale.city}, {sale.state} {sale.zip}</p>
              <p className="sale-list-date">Date: {moment(sale.date).format("MM-DD-YYYY")}</p>
              <p className="sale-list-time">Time: {moment(sale.start_time).format("hh:mmA")} to {moment(sale.end_time).format("hh:mmA")}</p>
              <p className="sale-list-description">{sale.description}</p>
            </div>
          )
        })
      ) : <p>Loading Search Results...</p>}
    </div>
  )
}

export default Sales;