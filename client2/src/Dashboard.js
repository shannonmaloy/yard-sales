import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'
const Dashboard = (props) => {
    const [usersSales, setUsersSales] = useState([])
    
    useEffect(() => {
        getData()
        
      }, [])
    

    const getData = () => {
        axios.get('/dashboard', { withCredentials: true })
            .then(res => {
                setUsersSales(res.data.sales)
            }).catch(err => {
                console.log("check login", err)
            }) 
    }

    function deleteSale(id) {
        
            axios.delete(`/sales/${id}`, { withCredentials: true })
                .then(res => {
                    getData()
                }).catch(err => {
                    console.log("check login", err)
                })
        
    }

    return (
        <div className='dashboard-container'>
            
            <h1>Welcome back!</h1>
            {usersSales.length !== 0 ? (usersSales.map((sale) => {
            return (
              <div className="sale" key={sale.id}>
                    <button type='button' onClick={() => deleteSale(sale.id)}><span role="img" aria-label="cross">❌</span></button>
                    <Link to={`/sales/${sale.id}`} props={sale}><button type='button'><span role="img" aria-label="edit">Edit</span></button></Link>
                  <h3>{sale.address}, {sale.city}, {sale.state} {sale.zip}</h3>
                  
                    <p>Date: {moment(sale.date).format("MM-DD-YYYY")}</p>
                <p>Time: {moment(sale.start_time).format("hh:mmA")} to {moment(sale.end_time).format("hh:mmA")}</p>
                <p>Description: {sale.description}</p>
                    {/* <button onClick={this.incrementMe}></button> */}
              </div>
            )})) : <p>You have no posted yard sales.</p>}
        </div>
    )
}

export default Dashboard