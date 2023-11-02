import React, { useEffect, useState } from 'react'
import VideoCard from '../../Components/Card/VideoCard'
import client from '../../Utils/axios-utils'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import NotFound from '../../Components/NotFound/NotFound'

function Classes() {
    const [video, setVideo] = useState([]);
    const [isError, SetIsError] = useState('')
    const dispatch = useDispatch();

    const fetchVideo = async () => {
        dispatch(showLoading());
        try {
            const response = await client.get('/user/get-videos')
            if (response.data.success) {
                setVideo(response.data.getVideos)
                dispatch(hideLoading())
            }
        } catch (error) {
            console.error(error);
            SetIsError(error.message)
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        fetchVideo()
    }, [])

 
if(isError){
    return <NotFound error={isError} />
}

    return (
        <>

< div className="bg-cover mx-2 h-[300px] flex flex-col items-center justify-center text-white py-24  object-fill " style={{backgroundImage: 'url(/pexels-victor-freitas-703016.jpg)'}}>
    <p className="font-bold text-center  mt-40  text-sm uppercase">Meet</p>
    <p className="text-xl  font-bold text-center   ml-10 leading-none">World’s most advanced SMART Weight Loss Plan </p>
    <a href="#" className="bg-transprant  border py-2 mt-3 px-8 text-white font-bold uppercase text-xs rounded-md hover:bg-gray-200 hover:text-gray-800">Know more</a>
     <div className="  w-screen mt-5 h-14.5  bg-gradient-to-b from-transparent via-rgba(37, 37, 37, 0.61) to-black h-[100px] p-5  "  ></div>
</div> 
 <VideoCard data={video} />
        </>
    )
}

export default Classes