import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar'
import BlogCard from '../../Components/Card/BlogCard';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import client from '../../Utils/axios-utils';


function Blog() {

  const dispatch = useDispatch();
  const [blog, setBolg] = useState([]);
  

  const getBlogInfo = async () => {
    dispatch(showLoading())
    try {
      const response = await  client.get('/user/get-user-blog-info')
      if (response.data.success) {
        setBolg(response.data.blog)
        dispatch(hideLoading())
      }
    } catch (error) {
      dispatch(hideLoading())
      console.error();
    }
  }

  useEffect(() => {
    getBlogInfo()
  }, [])


  return (
    <>
      <BlogCard  blog={blog} />
    </>
  )
}

export default Blog