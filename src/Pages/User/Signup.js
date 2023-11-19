import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import Register from '../../Components/User/Signup'



function Signup() {

  const dispatch = useDispatch(); 
  const Navigate = useNavigate();
  const [UserData, SetUserData] = useState({ name: '', email: '', password: '',repassword:''  })
  const [userInfo,setuserInfo] = useState('')

  
  const eventSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading())
      const response = await axios.post('/user/register',UserData); 
     if(response.data.success){
      Navigate("/otp")
      dispatch(hideLoading())
     }else{
      dispatch(hideLoading())
      setuserInfo(response.data.message)
      setTimeout(()=>{
        setuserInfo('')
      },2000)
     
     }
    } catch (error) {
      console.log("error......");
    }
  }

  return (
  <Register setData={SetUserData} eventSubmit={eventSubmit}  userStatus={userInfo} />
  )
}

export default Signup;