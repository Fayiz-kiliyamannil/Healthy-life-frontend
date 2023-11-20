import React, { useState } from 'react';


function Signin(props) {
 
   const [data,setData] = useState({email:'',password:''})


  const handleEvent = (event) => {
    const { name, value } = event.target
    setData((data)=>{
      const updatedData = {...data,[name]:value}
      props.setData(updatedData)
      return updatedData
    })
  }

  const hidePassword=()=>{

    const password = document.getElementById('password')
    if(password.type === 'password'){
       password.type = 'text'    
    }else{
      password.type = 'password'
    }
  }

  return (
    <>
      <div className='w-screen h-screen pt-[10%] bg-black  bg-cover ' style={{ backgroundImage: 'url("/gym-with-treadmills-light-wall.jpg")' }} >
        <div className="w-[400px] rounded-md bg-black bg-opacity-80 shadow-custom text-center p-[20px] mx-auto ">
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
                  <input id="email" name="email" value={data.email} onChange={handleEvent} type="email" autoComplete="email" required className="block w-full rounded-full  py-2 bg-[#898989] bg-opacity-20  text-[#C2C2C2] pl-5  " />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm text-left font-medium leading-6 text-[#C2C2C2]">Password</label>
                  <div className="text-sm">
                   
                  
                  </div>
                </div>
                <div className="mt-1">
                  <input id="password" name="password" type="password" value={data.password} onChange={handleEvent} autoComplete="current-password" required className="block w-full rounded-full  py-2 bg-[#898989] bg-opacity-20 text-[#C2C2C2] pl-5 " />
                  <div className="text-xs text-right mt-1 mr-3 ">
                  <label  className='text-[#C2C2C2]' > Show password </label>
                
                 <input  onClick={()=>hidePassword()} type='checkbox'/>
                </div>
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
           
              <a href="#" className="font-semibold p-1 leading-6 text-[#FA2A55] hover:text-[#BA0C2F] hover:border-b hover:border-[#BA0C2F] "> </a>
            </p> 
            : (props.trainer) ? <p className="mt-7 text-sm text-[#C2C2C2]">
            Not a member?
            <a href="/trainer/register" className="font-semibold p-1 leading-6 text-[#FA2A55] hover:text-[#BA0C2F] hover:border-b hover:border-[#BA0C2F] "> Signup now</a>
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
