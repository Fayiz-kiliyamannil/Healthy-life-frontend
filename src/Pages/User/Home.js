import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Banner from '../../Components/Banner/Banner';
import axios from 'axios'
import { LockClosedIcon } from '@heroicons/react/24/outline';
function Home() {

  const getData = async () => {
    try {
      const response = await axios.post('/user/get-user-into-by-id',{ }, {
        headers: {
          Authorization: 'Bearer '+localStorage.getItem('token')
        }
      })
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }   


  useEffect(() => {
    getData();
    const token = localStorage.getItem('token');
 console.log('Token:', token);

  }, [])

  return (
    <>
      <Navbar />
      <Banner />
    </>
  )
}

export default Home;