import React from 'react'
import { useParams } from 'react-router-dom'

function TrainerVideo() {
    const {id} = useParams()
  return (
    <div className='text-white' >TrainerVideo.........{id}</div>
  )
}

export default TrainerVideo