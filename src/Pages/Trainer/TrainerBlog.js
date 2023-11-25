import React, { useEffect } from 'react'
import trainerApi from '../../Utils/trainer-axio';
import BlogCard from '../../Components/Trainer/BlogCard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import NotFound from '../../Components/NotFound/NotFound';
import toast from 'react-hot-toast';


function TrainerBlog() {
    const dispatch = useDispatch()
    const [blog, setBlog] = useState([]);
    const [page, setPage] = useState(1);
    const [noOfPage, setNoOfPage] = useState()
    const [isError, setIsError] = useState('')


    const deleteBlog = async (trainerId) => {
        dispatch(showLoading())
        try {
            const response = await trainerApi.post('/trainer/delete-blog', { Id: trainerId })
            if (response.data.success) {
                // setBlog(response.data.trainerBlog);
                fetchTrainerBlog();
                toast.success(response.data.message);
                dispatch(hideLoading())
            }
        } catch (error) {
            console.error(error);
            setIsError(error)
            dispatch(hideLoading())
        }
    }
    const fetchTrainerBlog = async () => {
        dispatch(showLoading())
        try {
            const response = await trainerApi.get(`/trainer/trainer-blog?_limit=6&_page=${page}`)
            if (response.data.success) {
                setBlog(response.data.trainerBlog);
                setNoOfPage(response.data.noOfPage);
                dispatch(hideLoading());
            }
        } catch (error) {
            dispatch(hideLoading())
            setIsError(error)
        }
    }

    useEffect(() => {
        fetchTrainerBlog();
    }, [page])

    if (isError) {
        return <NotFound error={isError.message} />
    }



    return (
        <>
            <BlogCard blog={blog}
                deleteBlog={deleteBlog}
                trainer />

            {(noOfPage > 1) && (
                <div className='justify-center  flex'>
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

export default TrainerBlog