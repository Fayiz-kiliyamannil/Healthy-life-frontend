import React, { useState } from 'react';
import Admin_Navbar from '../../Components/Navbar/Admin_Navbar';
import Profile from '../../Components/Profile/Profile';
import { Params, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function Trainer_Details_Admin() {
    const {trainerId} = useParams();
    const [trainer,setTrainer] = useState();
    const dispatch = useDispatch();

    const getTraineeDetails  = async()=>{
        try {
            const response = await axios.post('/admin/trainee-details',)
        } catch (error) {
            
        }
    }
  return (
    <>
    <Admin_Navbar/>

    
    </>
  )
}

export default Trainer_Details_Admin
