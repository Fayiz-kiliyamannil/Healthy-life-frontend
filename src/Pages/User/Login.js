
import Signin from '../../Components/User/Login';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast"
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import {url} from '../../Utils/url'
function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [userStatus, setUserStatus] = useState('');


  

  const eventSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(url+'/user/login', userData);
      if (response.data.success) {
        toast.success(response.data.message,{
          style:{ background:'#333',color:'#fff'}})
          localStorage.setItem('token',response.data.data)
          navigate('/')
          setTimeout(() => {
          window.location.reload()
          dispatch(hideLoading());
        }, 1000);
      } else {
        dispatch(hideLoading());
        setUserStatus(response.data.message);
        toast.error(response.data.message,
          {
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        setTimeout(() => {
          setUserStatus('')
        }, 2000)
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("error...in signin");
    }
  }

  return (
  <Signin setData={setUserData} eventSubmit={eventSubmit} userStatus={userStatus} />
  
  )
}

export default Login;