import React from 'react'
import UserList from './UserList'

const Home = () => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-3 w-full'>
      <UserList></UserList>
      <UserList></UserList>
      <UserList></UserList>
      <UserList></UserList>
      <UserList></UserList>
      <UserList></UserList>
    </div>
  )
}

export default Home