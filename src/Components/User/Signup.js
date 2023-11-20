import React, { useState } from 'react';


function Signup(props) {

  const [data,setData] = useState({name:'',email:'',password:'',repassword:''})

   const hidePassword=()=>{
    const password = document.getElementById('password');
     const repassword = document.getElementById('repassword');

    if(password.type && repassword.type === 'password' ){
      password.type = 'text';
      repassword.type = 'text';
    }else{
      password.type = 'password';
      repassword.type = 'password';
    }
   }

  const eventHandle = (event) => {
    const { name, value } = event.target;
    // setData({ ...data,[name]: value});
    setData((data)=>{
      const udpdateData = {...data,[name]:value}
      props.setData(udpdateData);
      return udpdateData;
    })
   
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
                <input id="name" name="name" type="name" value={data.name} onChange={eventHandle} required className="block w-full  rounded-full py-2 bg-[#898989] bg-opacity-20 text-[#C2C2C2] pl-5" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-left font-medium leading-6 text-[#C2C2C2]">Email address</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" value={data.email} onChange={eventHandle}  required className="block w-full  rounded-full py-2 bg-[#898989] bg-opacity-20  text-[#C2C2C2] pl-5" />
               
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm text-left font-medium leading-6 text-[#C2C2C2]"> New Password</label>
                
              </div>
              <div className="mt-1">
                <input id="password" name="password" type="password" value={data.password}  autoComplete="new-password"  onChange={eventHandle}   className="block w-full   rounded-full py-2 bg-[#898989] bg-opacity-20 text-[#C2C2C2] pl-5" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="repassword" className="block text-sm text-left font-medium leading-6 text-[#C2C2C2]"> Re-Password</label>
                
              </div>
              <div className="mt-1">
                <input id="repassword" name="repassword" type="password" autoComplete="re-password"  value={data.repassword} onChange={eventHandle}  className="block w-full   rounded-full py-2 bg-[#898989] bg-opacity-20 text-[#C2C2C2] pl-5" />
                <div className="text-xs text-right mt-1 mr-3 ">
                  <label className='text-[#C2C2C2]' > Show password </label>
                
                 <input onClick={()=>hidePassword()} type='checkbox'/>
                </div>
              </div>      
              <p className="text-sm text-[#FA2A55]">
                {props.userStatus}
              </p>

            </div>
            

            <div>
              <button type="submit" className=" mt-7 flex w-full justify-center rounded-full bg-[#FA2A55] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#BA0C2F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Sign in</button>
            </div>
          
          </form>
            
          <p className="mt-7 text-sm text-[#C2C2C2]">
            Already a user?
            <a href="/login" className="font-semibold p-1 leading-6 text-[#FA2A55] hover:text-[#BA0C2F] hover:border-b hover:border-[#BA0C2F] "> Login</a>
          </p>

        </div>
      </div>
    </div>
  );
}
  
export default Signup;
