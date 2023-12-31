import React, { useState } from 'react'
import Signin from '../../Components/Trainer/Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import {url} from '../../Utils/url'

function TrainerLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [trainerData,setTrainerData] = useState({name:'',email:''});
    const [status,setstatus] = useState('');

    const eventSubmit =async(event)=>{
         dispatch(showLoading())
         event.preventDefault();
        try {
            const response = await axios.post(url+'/trainer/login',trainerData);
            if(response.data.success){
                toast.success(response.data.message, { style: { borderRadius: '10px', background: '#333', color: '#fff' }, });
                localStorage.setItem('trainerToken',response.data.data)
                navigate('/trainer/home')
                dispatch(hideLoading())
            }else{
              setstatus(response.data.message);
              setTimeout(()=>{
                 setstatus('')
              },3000)
              dispatch(hideLoading())
            }          
        } catch (error) {
          dispatch(hideLoading())
            console.error(error);
        }
    }

  return (
    <Signin trainer={true} eventSubmit={eventSubmit} setData={setTrainerData} userStatus={status} />
  )
}

export default TrainerLogin
