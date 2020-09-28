import React, { useState } from 'react';

const Sales = (props) => {
  
  console.log("Sales is updating...", props)
  
  let salesData = null
  if (props.dataProps.filteredSales) {
   salesData = props.dataProps.filteredSales
  } else salesData = props.dataProps.allSales
  console.log(salesData, "DATADADADA")
  
  return (
    <div className="sale-container">
      {console.log(props)}
      
      {salesData ? (
        salesData.map((sale) => {
          return (
            <div className="sale" key={sale.id}>
              <h3>{sale.user_id} {sale.address}, {sale.city}, {sale.state} {sale.zip}</h3>
                  <p>{sale.description}</p>
              <p>Date & Time: {sale.date} </p>
              <p>{sale.start_time} to {sale.end_time}</p>
            </div>
          );
        })
      ) : <p>Loading Search Results...</p>}
    </div>
  )
}

export default Sales;