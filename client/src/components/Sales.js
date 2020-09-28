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

          return (
            <div className="sale" key={sale.id}>
              <p>{sale.user_id} {sale.address}, {sale.city}, {sale.state} {sale.zip}</p>
                  <p>{sale.description}</p>
              <p>Date & Time: {moment(sale.date).format("MM-DD-YYYY")} </p>
              <p>{moment(sale.start_time).format("hh:mmA")} to {moment(sale.end_time).format("hh:mmA")}</p>
            </div>
          );
        })
      ) : <p>Loading Search Results...</p>}
    </div>
  )
}

export default Sales;