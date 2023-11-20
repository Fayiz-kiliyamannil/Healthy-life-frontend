import React from 'react'
import { useNavigate } from 'react-router-dom'
function VerifiedPage() {
const navigate = useNavigate()

  return (
    <div className="flex    h-screen">
    <div className='text-center mt-20  px-6  ' > 
      <p className="text-md font-medium  py-20   text-gray-300 mt-6 mx-32  mb-4"> To complete the activation of your account, we'll initiate a verification process. Once verified, your account will be activated and ready for use. 
      We appreciate your cooperation in ensuring account security.
      </p>
      <button  onClick={()=> navigate('/trainer/login') } className="text-white ml-3   bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5  ">Ok</button>
 
    </div>
  </div>
  )
}

export default VerifiedPage