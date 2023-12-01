import React, { useState } from 'react'
import RegisterForm from '../../Components/Trainer/RegisterForm'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import {url} from '../../Utils/url'

function TrainerSignup() {
    
     const [trainerData,setTrainerData] = useState({name:"",email:'',password:'',phone:''})
     const [status,setStatus] = useState('');
     const navigate = useNavigate();
     const dispatch = useDispatch();


     const eventSubmit = async(event)=>{
        event.preventDefault();
        try {
            dispatch(showLoading())
            const response =  await axios.post(url+'/trainer/register',trainerData);
            if(response.data.success){
                dispatch(hideLoading())
                toast.success(response.data.message, { style: { borderRadius: '10px', background: '#333', color: '#fff' }, });
                navigate('/trainer/verify')
            }else{
                dispatch(hideLoading())
                setStatus(response.data.message)
                setTimeout(()=>{
                    setStatus('')
                },3000)
            }
        } catch (error) {
            console.log(error);
        }
     }

  return (
    <RegisterForm eventSubmit={eventSubmit} setData={setTrainerData} userStatus={status} />
  )
}

export default TrainerSignup;
