import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const Dashboard = (props) => {
    const [usersSales, setUsersSales] = useState([])
    
    useEffect(() => {
        getData()
        
      }, [])
    

    const getData = () => {
        axios.get('http://localhost:3001/dashboard', { withCredentials: true })
            .then(res => {
                console.log(res.data.sales)
                setUsersSales(res.data.sales)
                    
                
            }).catch(err => {
                console.log("check login", err)
            }) 
    }

  function deleteSale (id) {
      console.log(id)
      axios.delete(`http://localhost:3001/sales/${id}`, { withCredentials: true })
          .then(res => {
              getData()
          }).catch(err => {
              console.log("check login", err)
          }) 
      }

    return (
        <div>
            
            <h1>Welcome back!</h1>
            {console.log(usersSales)}
            {usersSales.length !== 0 ? (usersSales.map((sale) => {
            return (
              <div className="sale" key={sale.id}>
                    <button type='button' onClick={() => deleteSale(sale.id)}><span role="img" aria-label="cross">❌</span></button>
                    <Link to={`/sales/${sale.id}`} props={sale}><button type='button'><span role="img" aria-label="edit">Edit</span></button></Link>
                  <h3>{sale.address}, {sale.city}, {sale.state} {sale.zip}</h3>
                  <p>{sale.id} - {sale.description}</p>
                  <p>Date & Time: {sale.date} </p>
                <p>{sale.start_time} to {sale.end_time}</p>
                {/* <button onClick={this.incrementMe}></button> */}
              </div>
            )})) : <p>You have no posted yard sales.</p>}
        </div>
    )
}

export default Dashboard