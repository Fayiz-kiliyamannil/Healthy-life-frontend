import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import VideoUpload from '../../Components/Trainer/VideoUpload';
import toast from 'react-hot-toast';
import trainerApi from '../../Utils/trainer-axio';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';

function UploadVideo() {
  const navigate = useNavigate();
  const [error,setError] = useState([])
  const [videoUpload, setVideoUpload] = useState({
    header: '',
    note: '',
  });
  const dispatch = useDispatch()


  
  const handleChange = (e) => { // to  handle header and note in to upload video
    const { name, value } = e.target;
    setVideoUpload({ ...videoUpload, [name]: value})
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
      dispatch(showLoading())
      const response = await trainerApi.post('/trainer/trainer-upload-video',
        videoUpload,
        {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      if(response.data.success){
        dispatch(hideLoading())
        toast.success(response.data.message,{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      }
        navigate(`/trainer/media/video`)
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