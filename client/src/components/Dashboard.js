import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Dashboard = (props) => {
    const [usersSales, setUsersSales] = useState([])
    console.log("Hello from dashboard:", props)
    useEffect(() => {
        // fetch('/users')
        //   .then(res => res.json())
        //   .then(res => {
        //     setData(res.users)
        //   })
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


    return (
        <div>
            <div> Welcome back! {props.user.email}</div>
            <h1>Status: {props.loggedInStatus}</h1>
            {console.log(usersSales)}
            {usersSales ? (
        usersSales.map((sale) => {
          return (
            <div className="sale" key={sale.id}>
                  <h3>User ID:{sale.user_id} - {sale.address}, {sale.city}, {sale.state} {sale.zip}</h3>
                  <p>{sale.id} - {sale.description}</p>
              <p>Date & Time: {sale.date} </p>
              <p>{sale.start_time} to {sale.end_time}</p>
            </div>
          );
        })
      ) : <p>No Yard Sales Posted...</p>}
        </div>
    )
}

export default Dashboard