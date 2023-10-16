import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Banner from '../../Components/Banner/Banner';
import axios from 'axios'
import { LockClosedIcon } from '@heroicons/react/24/outline';
import Card from '../../Components/Card/card';
import PricingSection from '../../Components/PricingSection/PricingSection';
import Footer from '../../Components/Footer/Footer';
function Home() {

  const [userData, setUserData] = useState([])

  const product = [
    { id: 1, progress: '1.2 kg', pros: "Average weight loss per week", image: "/istockphoto-1169486621-612x612.jpg" },
    { id: 2, progress: '80 %', pros: "Decline in lifestyle  diseases", image: "/food.jpg" },
    { id: 3, progress: '45 %', pros: "Increases in steps taken", image: "/foot.jpg" },
    { id: 4, progress: '>15 %', pros: "Avg.drop in Hbic levels", image: "yoga.png" },
  ]

  const getData = async () => {
    try {
      const response = await axios.post('/user/get-user-into-by-id', {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      setUserData(response.data.data)
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getData();
    localStorage.getItem('token');

  }, [])

  return (
    <>
   
      <Navbar userData={userData} />
      <Banner />
      <Card product={product} tittle={'How Healthy-Life Works'} />
      <div className='w-[80%] mx-auto '>
        <iframe className='w-full aspect-video border border-gray-500 rounded-lg' src="https://www.youtube.com/embed/LGBxJqT_CUI?si=YGBumVu22np829Ep" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
      </div>
      <Card product={product} tittle={"Healthy-Life Coaches at your Service"} />
      <PricingSection />
      <Footer />







    </>
  )
}


export default Home;