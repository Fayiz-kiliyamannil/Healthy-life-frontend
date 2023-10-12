import React, { useState } from 'react'
import Signin from '../../../Components/Login/Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast,{Toast} from 'react-hot-toast';

function TrainerLogin() {
    
    const navigate = useNavigate();
    const [trainerData,setTrainerData] = useState({name:'',email:''});
    const [status,setstatus] = useState('');

    const eventSubmit =async(event)=>{
        event.preventDefault();
        try {
            const response = await axios.post('/trainer/login',trainerData);
            if(response.data.success){
                toast.success(response.data.message, { style: { borderRadius: '10px', background: '#333', color: '#fff' }, });
                console.log(response.data.data);
                localStorage.setItem('trainerToken',response.data.data)
                navigate('/trainer/home')
            }else{
              setstatus(response.data.message);
              setTimeout(()=>{
                 setstatus('')
              },3000)
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    

  return (
    <Signin trainer={true} eventSubmit={eventSubmit} setData={setTrainerData} userStatus={status} />
  )
}

export default TrainerLogin
