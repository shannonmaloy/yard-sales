import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../static/house-favicon.png'

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
        
        return (
            <nav className="nav-container">
                <ul className="nav-list">
                    <li className='nav-links-left'><Link to='/sales'>Find A Sale</Link></li>
                    <li className='nav-links-left'><Link to='/sales/new'>Post A Sale</Link></li>
                    
                    <li className='nav-name'><h1><Link to='/'>YARD <img className="nav-logo" src={Logo} alt='logo'/>  SALE</Link></h1></li>
                    
                    <li className='nav-links-right'>{this.props.loggedInStatus === "Not_Logged_In" ? (<Link to='/registration'>Sign-Up</Link>) : (<Link to='/dashboard'>Dashboard</Link>)}</li>
                    <li className='nav-links-right'>{this.props.loggedInStatus === "Not_Logged_In" ? <Link to='/login'>Login</Link> : <Link to='/login' onClick={this.handleLogoutClick}>Logout</Link>}</li>
                </ul>
            </nav>
        )
    }
}