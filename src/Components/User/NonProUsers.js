import React, { useContext } from 'react'
import { usersContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function NonProUsers() {
     const {setPaymentNavigation} = useContext(usersContext);
     const navigate =  useNavigate();
     function pro(){
        setPaymentNavigation('payment');
        setTimeout(()=>{
         setPaymentNavigation('')
        },1000)
        navigate('/')
     }
 
    return (
    <>
     <div className="flex items-center justify-center h-screen">
      <div className='text-center  px-6  ' >
        <h1 className="text-xl font-bold text-gray-100 mb-3">Oops!, </h1>
        <h4 className="text- font-medium text-gray-300 mb-3">You dont't have any Membership</h4>
        <p className="text-[10px] font-medium text-red-400 mt-6  mb-4"> Don't Miss the awesome feature Healthy-Life pro 
        <span>
        <button  onClick={pro}  className="text-white ml-3   bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5  ">subscribe</button>
        </span>
        </p>
   
      </div>
    </div>
    </>
  )
}

export default NonProUsers