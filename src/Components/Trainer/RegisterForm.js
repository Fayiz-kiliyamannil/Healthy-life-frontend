import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { hideLoading, showLoading } from '../../Redux/alertSlice';


function RegisterForm(props) {

  const [data,setData] = useState({name:'',email:'',password:'',phone:''})


  const eventHandle = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    props.setData(data)
  }


  return (
    <div className='w-screen h-screen bg-cover pt-[10%] ' style={{ backgroundImage: 'url("/gym-with-treadmills-light-wall.jpg")'}}  >
      <div className="w-[400px] rounded-md bg-black bg-opacity-80 shadow-custom text-center p-[20px] mx-auto ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center ">
            <img className="h-12 pl-[40%]" src="/logo.png" alt="Your Logo" />
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#C2C2C2]"> Create an Account </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-2" onSubmit={props.eventSubmit} >
            <div>
              <label htmlFor="name" className="block text-sm text-left font-medium leading-6 text-[#C2C2C2]">Name</label>
              <div className="mt-1">
                <input id="name" name="name" type="name" value={data.name} onChange={eventHandle} required className="block w-full  border-b rounded-full py-2 bg-[#898989] bg-opacity-20 text-[#C2C2C2] pl-5" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-left font-medium leading-6 text-[#C2C2C2]">Email address</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" value={data.email} onChange={eventHandle} autoComplete="email" required className="block w-full border-b  rounded-full py-2 bg-[#898989] bg-opacity-20  text-[#C2C2C2] pl-5" />
               
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-left font-medium leading-6 text-[#C2C2C2]">Phone No:</label>
              <div className="mt-1">
                <input id="phone" name="phone" type="phone" value={data.phone} onChange={eventHandle} required className="block w-full  rounded-full py-2 bg-[#898989] border-b bg-opacity-20  text-[#C2C2C2] pl-5" />
               
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm text-left font-medium leading-6 text-[#C2C2C2]"> New Password</label>
                
              </div>
              <div className="mt-1">
                <input id="password" name="password" type="password" value={data.password} onChange={eventHandle}  required className="block w-full   rounded-full py-2 bg-[#898989] border-b  bg-opacity-20 text-[#C2C2C2] pl-5" />
              </div>
              <div className="text-sm text-right mt-1">
                  <a href="#" className="font-semibold text-[#FA2A55] hover:text-red-500">Forgot password?</a>
                </div>
              
      
              <p className="text-sm text-[#FA2A55]">
                {props.userStatus}
              </p>

            </div>
            

            <div>
              <button type="submit" className=" mt-7 flex w-full justify-center rounded-full bg-[#FA2A55] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#BA0C2F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Register</button>
            </div>
          
          </form>
            
          <p className="mt-7 text-sm text-[#C2C2C2]">
            Already a Trainer?
            <a href="/trainer/login" className="font-semibold p-1 leading-6 text-[#FA2A55] hover:text-[#BA0C2F] hover:border-b hover:border-[#BA0C2F] "> Login</a>
          </p>

        </div>
      </div>
    </div>
  );
}
  
export default RegisterForm;
