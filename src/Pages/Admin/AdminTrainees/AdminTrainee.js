import React, { useEffect, useState } from 'react'
import Admin_Navbar from '../../../Components/Admin/Admin_Navbar';
import Tables from '../../../Components/Tables/Tables';
import axios from 'axios';

function AdminTrainee() {
 
    const [userData,setUserData] =  useState([])

    const userdata = async () => {
        try {
          const response = await axios.get('/admin/trainees');
          console.log(response.data.userData);
          setUserData(response.data.userData);
          
        } catch (error) {
          console.error('Error:', error);
        }
      }
    
      useEffect(() => {
        userdata();
      }, []);

      useEffect(()=>{
        console.log(userData);
      },[userData])


    return (
        <>
            <Admin_Navbar trainee={true} />
            <Tables data={userData} />
    
        </>
    )
}

export default AdminTrainee
