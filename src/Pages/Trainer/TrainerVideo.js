import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import trainerApi from '../../Utils/trainer-axio'
import Spinner from '../../Components/Spinner/spinner'
import VideoCard from '../../Components/Card/VideoCard';
import toast from 'react-hot-toast';

function TrainerVideo() {
  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [error, setError] = useState([]);
  const [isLoding, setLoding] = useState(true)

  const fetchTrainerVideo = async () => {
    try {
      const response = await trainerApi.post('/trainer/fetch-trainer-video', { id: id })
      if (response.data.success) {
        setVideo(response.data.videoData);
        setLoding(false);
      }
    } catch (error) {
      console.error(error);
      setLoding(false)
    }
  }

  const deleteVideo = async (videoId) => {
    try {
      setLoding(true);
      const response = await trainerApi.post('/trainer/trainer-video-delete',{videoId:videoId})
      if(response.data.success){
        setVideo(response.data.videoData);
        toast.success(response.data.message,{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
        setLoding(false)
      }

    } catch (error) {
      console.error(error);
      setLoding(false)
    }
  }

  useEffect(() => {
    fetchTrainerVideo();
  }, [])
  if (isLoding) {
    return <Spinner />
  }

  return (
    <>
      <VideoCard data={video} deleteVideo={deleteVideo} trainer />
    </>

  )
}

export default TrainerVideo