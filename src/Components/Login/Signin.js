import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import toast, { Toast } from "react-hot-toast"
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';

function Signin(props) {
 
   const [data,setData] = useState({email:'',password:''})


  const handleEvent = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
    props.setData(data);
  }

  return (
    <>
      <div className='w-screen h-screen pt-[10%] bg-black  bg-cover ' style={{ backgroundImage: 'url("/photo.png")' }} >
        <div className="w-[400px] rounded-md bg-black bg-opacity-10 shadow-custom text-center p-[20px] mx-auto ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="items-center">
              <img className="h-12 pl-[40%]" src="/logo.png" alt="Your Logo" />
            </div>
            {
              (props.admin) ? <h2 className="mt-1 text-center font-bold text-xl leading-9 tracking-tight text-[#C2C2C2]">Admin Login</h2>
              : (props.trainer) ?  <h2 className="mt-1 text-center font-bold text-xl leading-9 tracking-tight text-[#C2C2C2]">Trainer's Login</h2>
              : <h2 className="mt-1 text-center font-bold text-xl leading-9 tracking-tight text-[#C2C2C2]">Sign in to get the best experience</h2>
            }
           
          </div>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-2" onSubmit={props.eventSubmit} method="POST">
              <div>
                <label htmlFor="email" className="block text-sm text-left font-medium leading-6 text-[#C2C2C2]">Email address</label>
                <div className="mt-1">
                  <input id="email" name="email" value={data.email} onChange={handleEvent} type="email" autoComplete="email" required className="block w-full rounded-full  py-2 bg-black bg-opacity-30 text-[#C2C2C2] pl-5  " />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm text-left font-medium leading-6 text-[#C2C2C2]">Password</label>
                  <div className="text-sm">
                    {
                      (props.admin)? <a href="#" className="font-semibold text-[#FA2A55] hover:text-red-500"></a>
                      :  <a href="#" className="font-semibold text-[#FA2A55] hover:text-red-500">Forgot password?</a>
                    }
                   
                  </div>
                </div>
                <div className="mt-1">
                  <input id="password" name="password" type="password" value={data.name} onChange={handleEvent} autoComplete="current-password" required className="block w-full rounded-full  py-2 bg-black bg-opacity-30 text-[#C2C2C2] pl-5 " />
                </div>
              </div>
              <p className="text-sm text-[#FA2A55]">
                {props.userStatus}
              </p>

              <div>
                <button type="submit" className="mt-6 flex w-full justify-center rounded-full bg-[#FA2A55] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#BA0C2F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Sign in</button>
              </div>

            </form>
            {
              (props.admin) ?  <p className="mt-7 text-sm text-[#C2C2C2]">
           
              <a href="/register" className="font-semibold p-1 leading-6 text-[#FA2A55] hover:text-[#BA0C2F] hover:border-b hover:border-[#BA0C2F] "> </a>
            </p> 
            : <p className="mt-7 text-sm text-[#C2C2C2]">
            Not a member?
            <a href="/register" className="font-semibold p-1 leading-6 text-[#FA2A55] hover:text-[#BA0C2F] hover:border-b hover:border-[#BA0C2F] "> Signup now</a>
          </p>
            }

            
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
