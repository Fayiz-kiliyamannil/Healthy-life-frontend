import React, { useEffect, useState } from 'react'
import VideoDetails  from '../../Components/detailsPage/videoDetails'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import trainerApi from '../../Utils/trainer-axio';
import { useParams } from 'react-router-dom';
import NotFound from '../../Components/NotFound/NotFound';



function TrainerVideoDetails() {
  const dispatch = useDispatch();
  const [videoInfo,setVideoInfo] = useState([])
  const {videoId} = useParams();
  const [isError,setError] = useState();

    const fetchVideoDetails = async () => {
        dispatch(showLoading())
        try {
            const response = await trainerApi.post('/trainer/trainer-video-details', { videoId: videoId })
            if (response.data.success) {
                setVideoInfo(response.data.videoDetails);
                dispatch(hideLoading());
            }
        } catch (error) {
            console.error(error);
            setError(error.message)
            dispatch(hideLoading())
        }
    }
    useEffect(() => {
        fetchVideoDetails();
    }, [])

if(isError){
    return <NotFound error={isError} />
}

  return (
  <>
  <VideoDetails data={videoInfo} />
  </>
  )
}

export default TrainerVideoDetails