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
        <div className="dashboard-whole-container">
            <p className="dashboard-header">Welcome Back!</p>
            <p className="dashboard-header">Your Posted Sales:</p>
            <div className='dashboard-container'>
            {usersSales.length !== 0 ? (usersSales.map((sale) => {
            return (
              <div className="dashboard-sale" key={sale.id}>
                    <button className="delete-button" type='button' onClick={() => deleteSale(sale.id)}><span classname="delete-icon" role="img" aria-label="cross">❌</span></button>
                    
                    <p className='dashboard-list-address'>{sale.address}, {sale.city}, {sale.state} {sale.zip}</p>
                    <p className='dashboard-list-date'><span className='bold'>Date: </span> {moment(sale.date).format("MM-DD-YYYY")} <span className='bold'>&nbsp;&nbsp;&nbsp;&nbsp;Time: </span> {moment(sale.start_time).format("hh:mmA")} to {moment(sale.end_time).format("hh:mmA")}</p>
                    <p className='dashboard-list-time'></p>
                    <p className='dashboard-list-description'>{sale.description}</p>
                    <Link to={`/sales/${sale.id}`} props={sale}><button className="edit-button" type='button'>Edit</button></Link>
                    {/* <button onClick={this.incrementMe}></button> */}
              </div>
            )})) : <p>You have no posted yard sales.</p>}
            </div>
        </div>
    )
}

export default Dashboard