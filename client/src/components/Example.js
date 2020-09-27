import React, { Component } from 'react'


export default function Example (props) {
    
    let result = props.dataProps.data
    let newData = props.dataProps.filteredData
    console.log("Props from example: ",props.dataProps)
    return(
        <div>Hello 
            {result ? <h1>{result[0].address}</h1> : <h1>Loading..</h1>}
            {newData ? <h1>{newData.length}: {newData[0].address}</h1> : <h1>Waiting..</h1>}
            
        </div>
        )
}