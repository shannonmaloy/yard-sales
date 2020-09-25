import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import Example from '../components/Example'

export default class Header extends Component {
    constructor(props) {
        super(props)
        
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }
    
    handleLogoutClick(props) {
        axios.delete("http://localhost:3001/logout", { withCredentials: true })
            .then(res => {
                this.props.handleLogout()
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
                    
                    {/* <Example /> */}
                    <li><Link to='/sales'>Find A Sale</Link></li>
                    <li><Link to='/sales/post'>Post A Sale</Link></li>
                    <li><h1><Link to='/'>YARD SALE</Link></h1></li>
                    
                    <li><Link to='/dashboard'>Account</Link></li>
                    <li>{this.props.loggedInStatus === "Not_Logged_In" ? <Link to='/users'>Login</Link> : <Link to='/users' onClick={this.handleLogoutClick}>Logout</Link>}</li>
                </ul>
            </nav>
        )
    }
}