import React, { useEffect, useState } from 'react';
import Login from './auth/Login'
const Users = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(res => {
        setData(res.users)
      })
  }, [])

  return (
    <div>
     
            <div className="user" key={user.id}>
                  <h3>{user.email}</h3>
                  <Login/>
                  <p>{user.name}</p>
                  <p>{user.password}</p>
            </div>
          
    </div>
  )
}

export default Users;