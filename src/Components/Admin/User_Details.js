import React from 'react'
import { useParams } from 'react-router-dom'
import Admin_Navbar from '../Navbar/Admin_Navbar';
function User_Details() {
    const params = useParams()
    const userId  = params.userId;
  return (
    <div>
         <Admin_Navbar/>
      <h1 className='text-white' > Traineee Details :{userId}</h1>
      {
        console.log(userId)
      }
    </div>
  )
}

export default User_Details
