import React, { useEffect, useState } from 'react';

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
      {data ? (
        data.map((user) => {
          return (
            <div className="user" key={user.id}>
                  <h3>{user.email}</h3>
              
                  <p>{user.name}</p>
                  <p>{user.password}</p>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Users;