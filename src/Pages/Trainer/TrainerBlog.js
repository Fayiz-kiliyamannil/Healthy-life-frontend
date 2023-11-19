import React, { useEffect } from 'react'
import {  useParams } from 'react-router-dom'
import trainerApi from '../../Utils/trainer-axio';
import BlogCard from '../../Components/Trainer/BlogCard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import NotFound from '../../Components/NotFound/NotFound';
import toast from 'react-hot-toast';


function TrainerBlog() {
    const {id} = useParams();
    const dispatch = useDispatch()
    const [blog ,setBlog] = useState([]);
    const [isError,setIsError] = useState('')


   const deleteBlog = async(trainerId)=>{
    dispatch(showLoading())
    try {
        const response = await trainerApi.post('/trainer/delete-blog',{Id:trainerId})
         if(response.data.success){
            setBlog(response.data.trainerBlog);
            toast.success(response.data.message)
            dispatch(hideLoading())
         }
    } catch (error) {
        console.error(error);
        setIsError(error)
        dispatch(hideLoading())
    }
   } 
    const fetchTrainerBlog = async ()=>{
        dispatch(showLoading())
        try {
            const response = await trainerApi.post('/trainer/trainer-blog')
            if(response.data.success){
                setBlog(response.data.trainerBlog)
                dispatch(hideLoading());
            }
        } catch (error) {
            dispatch(hideLoading())
             setIsError(error)
        }
    }

    useEffect(()=>{
   fetchTrainerBlog();
    },[])

if(isError){
    return <NotFound error={isError.message} />
}


  return (
   <>
    <BlogCard blog={blog} 
    deleteBlog={deleteBlog}
    trainer />
   </>

  )
}

export default TrainerBlog