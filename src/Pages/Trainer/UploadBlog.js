import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import BlogUpload from "../../Components/Trainer/BlogUpload";
import trainerApi from "../../Utils/trainer-axio";

function UploadBlog() {
  const [blog, setBlog] = useState({
    header: "",
    note: "",
  });
  const navigate = useNavigate()
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const handleEvent = (e) => {

    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value,});
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, blogImg: file});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};
    try {
      if (!blog.header.trim()) {
        newError.header = "Heading is Require";
      }
      if (!blog.note.trim()) {
        newError.note = "Content is Require";
      }
      if(!blog.blogImg){
        newError.image  = 'upload image'
      }
      setError(newError);
      if (Object.keys(newError).length === 0) {
        dispatch(showLoading());
        const response = await trainerApi.post(
          "/trainer/trainer-upload-blog",
          blog,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          dispatch(hideLoading());
          toast.success(response.data.message);
         navigate('/trainer/media/blog')
        }
      }
      setTimeout(() => {
        setError('')
      }, 3000);
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  return (
    <>
   <BlogUpload  blog={blog}  handleImage={handleImage} handleEvent ={handleEvent }  error={error} handleSubmit={handleSubmit} />
    </>
  );
}

export default UploadBlog;
