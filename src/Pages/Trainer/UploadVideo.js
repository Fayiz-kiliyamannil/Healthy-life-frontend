import React from 'react'
import { Params, useParams } from 'react-router-dom'

function UploadVideo() {
    const {id} =useParams();
  return (
   <>
   <h1 className='text-white'>
    Upload video........{id}
   </h1>
   </>
  )
}

export default UploadVideo