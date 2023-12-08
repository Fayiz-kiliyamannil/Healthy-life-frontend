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
    const [page,setPage] = useState(1);
    const [noOfPage,setNoOfPage] = useState();
    const [pro, setPro] = useState(false);
    const dispatch = useDispatch();
  
    const fetchVideo = async () => {
        dispatch(showLoading());
        try {
            const response = await client.get(`/user/get-videos?_limit=8&_page=${page}`)
            if (response.data.success) {
                setVideo(response.data.getVideos);
                setNoOfPage(response.data.noOfpage);
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
    }, [page])


    if (isError) {
        return <NotFound error={isError} />
    }
    if (!pro) {
        return <NonProUsers/> //----------------------
    }
  

    return (
        <>
            < div className="bg-cover mx-2 h-[200px] flex flex-col  items-center justify-center text-white py-10  object-fill ">
                <p className="text-lg  font-medium  text-center  mt-7  text-gray-400 leading-none">World’s most advanced SMART Weight Loss Plan </p>
                <div className='mt-5 '  >
                    <Link to='videocall' className="  py-2  px-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm text-center me-2 mb-2">Video Call With Trainer</Link>
                    <Link to='chat' className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                        Chat With Trainer
                    </Link>
                
                </div>
               
            </div>
            <VideoCard data={video} />

            { (noOfPage > 1 ) &&(
                <div className='justify-center flex'>
                <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <button onClick={ ()=> setPage(page - 1 )} disabled={page === 1} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</button>
              </li>
              {Array.from({ length: noOfPage }).map((_, index) => (
                  <li key={index}>
                   <button
            onClick={(e) => {
              setPage(index + 1);
              e.target.focus();   
            }}
            className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500  border border-gray-700 hover:bg-gray-600  hover:bg-gray-00 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white focus:hover:bg-gray-100  ${
              page === index+ 1 ? 'bg-[#FA2A55] text-white': '' 
            }`}
          >
            {index + 1}
          </button>
                  </li>
                ))}
              <li>
                <button onClick={()=> setPage(page + 1 )} disabled={page === noOfPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">Next</button>
              </li>
            </ul>
          </nav>
               </div>
            ) }
        </>
    )
}

export default Classes 