import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar'
import BlogCard from '../../Components/Card/BlogCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import Login from './Login';

function Blog() {

  const dispatch = useDispatch();
  const [blog, setBolg] = useState([]);
  

  const getBlogInfo = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get('/user/get-user-blog-info')
      if (response.data.success) {
        setBolg(response.data.blog)
        console.log(response.data.blog);
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
      <Navbar />
      <BlogCard  blog={blog} />
    </>
  )
}

export default Blog