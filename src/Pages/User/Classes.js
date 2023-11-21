import React, { useEffect, useState } from 'react'
import VideoCard from '../../Components/User/VideoCard'
import client from '../../Utils/axios-utils'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import NotFound from '../../Components/NotFound/NotFound'
import { Link } from 'react-router-dom';
import NonProUsers from '../../Components/User/NonProUsers'

function Classes() {
    const [video, setVideo] = useState([]);
    const [isError, SetIsError] = useState('')
    const [pro, setPro] = useState(false);
    const dispatch = useDispatch();

    const fetchVideo = async () => {
        dispatch(showLoading());
        try {
            const response = await client.get('/user/get-videos')
            if (response.data.success) {
                setVideo(response.data.getVideos)
                setPro(response.data.proUser)
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


    if (isError) {
        return <NotFound error={isError} />
    }
    if (!pro) {
        return <NonProUsers/> //----------------------
    }
  

    return (
        <>
            < div className="bg-cover mx-2 h-[300px] flex flex-col items-center justify-center text-white py-24  object-fill " style={{ backgroundImage: 'url(/pexels-victor-freitas-703016.jpg)' }}>
                <p className="font-bold text-center  mt-40  text-sm uppercase">Meet</p>
                <p className="text-xl  font-bold text-center   ml-10 leading-none">World’s most advanced SMART Weight Loss Plan </p>
                <div className='mt-5 '  >
                    <Link to='videocall' className="  py-2  px-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm text-center me-2 mb-2">Video Call With Trainer</Link>
                    <Link to='chat' className="bg-[#FA2A55] py-2 ml-3 px-2  hover:border-gray-200 text-white font-bold uppercase text-xs rounded-md hover:bg-gray-200 hover:text-gray-800">
                        Chat With Trainer
                    </Link>
                
                </div>
                <div className="  w-screen mt-5 h-14.5  bg-gradient-to-b from-transparent via-rgba(37, 37, 37, 0.61) to-black h-[100px] p-5  "  ></div>
            </div>
            <VideoCard data={video} />
        </>
    )
}

export default Classes 