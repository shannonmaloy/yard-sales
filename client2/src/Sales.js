import React, { useEffect, useState } from 'react';
import moment from 'moment'
const Sales = (props) => {
  

  let salesData = null
  if (props.dataProps.filteredSales) {
    salesData = props.dataProps.filteredSales.sort((a,b) => (a.date > b.date) ? 1 : -1)
    console.log(salesData)
  } else if (props.dataProps.allSales) {
    salesData = props.dataProps.allSales.sort((a,b) => (a.date > b.date) ? 1 : -1)
    console.log(salesData)
  }
  
  
  return (
    <div className="sale-container">

      {salesData ? (
        salesData.map((sale) => {
          console.log(salesData.length)
          if (salesData.length === []) {
            return(
            <div className="sale" key={sale.id} >
            <p className="sale-list-address1">No Current Sales In Your Area</p> 
            <p className="sale-list-address2">Try A New Search</p>
            <p className="sale-list-date"></p>
            <p className="sale-list-time"></p>
            <p className="sale-list-description"></p>
          </div>)
          } else
          return (
            
            <div className="sale" key={sale.id} onClick={() => props.panTo(sale.lat, sale.lng)}>
              <p className="sale-list-address1">{sale.address}</p> 
              <p className="sale-list-address2">{sale.city}, {sale.state} {sale.zip}</p>
              <p className="sale-list-date"><span className='bold'>Date:</span> {moment(sale.date).format("MM-DD-YYYY")}</p>
              <p className="sale-list-time"><span className='bold'>Time: </span>{moment(sale.start_time).format("hh:mmA")} to {moment(sale.end_time).format("hh:mmA")}</p>
              <p className="sale-list-description">{sale.description}</p>
            </div>
          )
        })
      ) : <p>Loading Search Results...</p>}
    </div>
  )
}

export default Sales;