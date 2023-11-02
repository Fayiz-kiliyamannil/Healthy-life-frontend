import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import client from '../../Utils/axios-utils';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import NotFound from '../../Components/NotFound/NotFound';
import VideoDetail from '../../Components/detailsPage/videoDetails';


function VideoDetails() {
    const { videoId } = useParams();
    const [videoInfo, setVideoInfo] = useState([]);
    const dispatch = useDispatch();
    const [isError, setIsError] = useState('')

    const fetchVideoDetails = async () => {
        dispatch(showLoading())
        try {
            const response = await client.post('/user/video-info-control', { videoId: videoId })
            if (response.data.success) {
                setVideoInfo(response.data.videoInfo)
              
                dispatch(hideLoading())
            }
        } catch (error) {
            console.error(error);
            setIsError(error.message)
            dispatch(hideLoading())
        } 
    }

    useEffect(()=>{
   fetchVideoDetails()
    },[])

    if(isError){
        return <NotFound error={isError}/>
    }

    return (
      <>

      <VideoDetail data={videoInfo} />
  
    </>
    )
}

export default VideoDetails