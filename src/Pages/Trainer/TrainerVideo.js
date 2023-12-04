import React, { useEffect, useState } from 'react'
import trainerApi from '../../Utils/trainer-axio'
import VideoCard from '../../Components/Trainer/VideoCard';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import NotFound from '../../Components/NotFound/NotFound';



function TrainerVideo() {
  const [video, setVideo] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [noOfPage,setNoOfPage] = useState()
  const  dispatch = useDispatch()


  const fetchTrainerVideo = async () => {
    dispatch(showLoading())
    try {
      const response = await trainerApi.get(`/trainer/fetch-trainer-video?_limit=8&_page=${page}`)
      if (response.data.success) {
        setVideo(response.data.videoData);
        setNoOfPage(response.data.noOfPage)
        dispatch(hideLoading())
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message)
      dispatch(hideLoading());
    }
  }
  
  useEffect(() => {
    fetchTrainerVideo();
  }, [])


  const deleteVideo = async (videoId) => {
    dispatch(showLoading())
    try {
      const response = await trainerApi.post('/trainer/trainer-video-delete', { videoId: videoId })
      if (response.data.success) {
        setVideo(response.data.videoData);
        toast.success(response.data.message, {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
        dispatch(hideLoading());  
      }

    } catch (error) {
      console.error(error);
     dispatch(hideLoading())
    }
  }

  

  if(error){
    return <NotFound error={error} />
  }


  return (
    <>
      <VideoCard data={video} deleteVideo={deleteVideo} trainer />
      {(noOfPage > 1) && (
        <div className='justify-center flex'>
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px text-sm">
              <li>
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</button>
              </li>
              {Array.from({ length: noOfPage }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={(e) => {
                      setPage(index + 1);
                      e.target.focus();
                    }}
                    className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500  border border-gray-700 hover:bg-gray-600  hover:bg-gray-00 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white focus:hover:bg-gray-100  ${page === index + 1 ? 'bg-[#F9951D] text-white' : ''
                      }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => setPage(page + 1)} disabled={page === noOfPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}

    </>

  )
}

export default TrainerVideo