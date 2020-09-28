import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class Header extends Component {
    constructor(props) {
        super(props)
        
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }
    
    handleLogoutClick(props) {
        axios.delete("http://localhost:3001/logout", { withCredentials: true })
            .then(res => {
                this.props.handleLogout()
                this.props.history.push("/login")
            })
            .catch(err => {
            console.log("logout error", err)
        })
    }

    render() {
        console.log("props from header", this.props.loggedInState)
        return (
            <nav className="nav-container">
                <ul className="nav-links">
                   
                    <li><Link to='/sales'>Find A Sale</Link></li>
                    <li><Link to='/sales/new'>Post A Sale</Link></li>
                    <li><h1><Link to='/'>YARD SALE</Link></h1></li>
                    
                    <li>{this.props.loggedInStatus === "Not_Logged_In" ? (<Link to='/registration'>Sign-Up</Link>) : (<Link to='/dashboard'>Dashboard</Link>)}</li>
                    <li>{this.props.loggedInStatus === "Not_Logged_In" ? <Link to='/login'>Login</Link> : <Link to='/login' onClick={this.handleLogoutClick}>Logout</Link>}</li>
                </ul>
            </nav>
        )
    }
}