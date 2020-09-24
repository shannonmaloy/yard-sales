import React from 'react'

const Dashboard = props => {
    return (
        <div>
            <div>Dashboard</div>
            <h1>Status: {props.loggedInStatus}</h1>
        </div>
    )
}

export default Dashboard