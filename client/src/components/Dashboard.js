import React from 'react'

const Dashboard = props => {
    console.log("Hello from dashboard:" , props)
    return (
        <div>
            <div> {props.user.email} - Dashboard COMPONENT</div>
            <h1>Status: {props.loggedInStatus}</h1>
        </div>
    )
}

export default Dashboard