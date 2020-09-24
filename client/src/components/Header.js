import React from 'react'
import { Link } from 'react-router-dom'
// import Example from '../components/Example'

export default function Header(props) {
    return (
        <nav className="nav-container">
            <ul className="nav-links">
                <h1>YARD SALE</h1>
                {/* <Example /> */}
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/sales'>Find A Sale</Link></li>
                <li><Link to='/sales/post'>Post A Sale</Link></li>
                <li><Link to='/users'>Login</Link></li>
            </ul>
        </nav>
    )
}