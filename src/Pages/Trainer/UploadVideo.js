import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import VideoUpload from '../../Components/UploadFile/VideoUpload';
import axios from 'axios';
import toast from 'react-hot-toast';

function UploadVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error,setError] = useState([])
  const [videoUpload, setVideoUpload] = useState({
    header: '',
    note: '',
  });


  
  const handleChange = (e) => { // to  handle header and note in to upload video
    const { name, value } = e.target;
    setVideoUpload({ ...videoUpload, [name]: value, id: id })
  }

  const handleVideo = (e) => {  // to handle  file here 
    const file = e.target.files[0];
    setVideoUpload({ ...videoUpload, video: file })
  }

  const handleSubmit =async(e) => {
    e.preventDefault();
    const newError = {}
    try {

      if(! videoUpload.header.trim()){
        newError.header = 'Heading Required'
      }

      if(! videoUpload.note.trim()){
        newError.note= 'Commet Required'
      }
      if(! videoUpload.video){
        newError.video = 'Video is Require'
     }

      if(Object.keys(newError).length === 0){
      const response = await axios.post('/trainer/trainer-upload-video',
        videoUpload,
        {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      if(response.data.success){
        toast.success(response.data.message,{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      }
        navigate(`/trainer/media/${id}/video`)
    }
    setError(newError)
    setTimeout(() => {
      setError([])
    }, 3000);

    } catch (error) {
      console.error(error);
    }
  }

  return (
     <>
      <VideoUpload handleChange={handleChange} error={error} handleSubmit={handleSubmit} videoUpload={videoUpload} handleVideo={handleVideo}/>
    </>
  )
}

export default UploadVideo