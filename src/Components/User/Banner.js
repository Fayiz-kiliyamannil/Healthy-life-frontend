import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { usersContext } from '../../App';

function Banner() {
 const {paymentNavigation} = useContext(usersContext)
  useEffect(()=>{
    console.log(paymentNavigation);
    const targetElement = document.getElementById(paymentNavigation);
    if(targetElement){
      targetElement.scrollIntoView({block:'start'})
    }
  },[])

  function toKnow (){
    const targetElement = document.getElementById('knowMore');
    if(targetElement){
      targetElement.scrollIntoView({behavior:'smooth'})
    }
  }

  
  return (
   <>

  < div className="bg-cover h-[600px] text-white py-24  object-fill " style={{backgroundImage: 'url(/pexels-victor-freitas-703016.jpg)'}}>
   
       <div className="md:w-1/2  items-center mt-[200px]  ">
        <p className="font-bold ml-10 text-sm uppercase">Meet</p>
        <p className="text-3xl ml-10 font-bold">Healthy-Life</p>
        <p className="text-xl mt-2 font-bold  mb-10 ml-10 leading-none">World’s most advanced SMART Weight Loss Plan </p>
        <Link to='/contact' className="bg-[#FA2A55] py-4 ml-10 px-8  text-white font-bold uppercase text-xs rounded-md hover:bg-gray-200 hover:text-gray-800">Contact us</Link>
        <button onClick={toKnow} className="bg-transprant border py-4 mx-4 px-8 text-white font-bold uppercase text-xs rounded-md hover:bg-gray-200 hover:text-gray-800">Know more</button>
       
        </div>  
        <div className=" w-screen   bg-gradient-to-b from-transparent via-rgba(37, 37, 37, 0.61) to-black h-[100px] mt-[30px]  "  >
    </div>
    </div>
    
   </>
  )
}

export default Banner