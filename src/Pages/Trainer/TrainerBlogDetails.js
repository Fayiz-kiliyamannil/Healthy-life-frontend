import React, { useEffect, useState } from 'react';
import BlogDetails from '../../Components/Trainer/BlogDetails';
import { useParams } from 'react-router-dom';
import trainerApi from '../../Utils/trainer-axio';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import NotFound from '../../Components/NotFound/NotFound';

function TrainerBlogDetails() {
  const  {blogId} = useParams();
  const [blogInfo,setblogInfo] = useState([])
  const dispatch = useDispatch()
  const [isError,setIsError] = useState('')

  const fetchBlogDetails = async()=>{
    dispatch(showLoading())
    try {
      const response = await trainerApi.post('/trainer/blog-details',{blogId:blogId})
      if(response.data.success){
       setblogInfo(response.data.blog);
       dispatch((hideLoading()))
      }
    } catch (error) {
      setIsError(error.message)
      console.error(error);
      dispatch(hideLoading())
    }
  }


  useEffect(()=>{
fetchBlogDetails();
  },[])

  if(isError){
    return <NotFound error={isError}/>
  }

  return (
   <>
   <BlogDetails data={blogInfo} trainer />
   </>
  )
}

export default TrainerBlogDetails