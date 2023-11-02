import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import trainerApi from '../../Utils/trainer-axio';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import BlogUpload from '../../Components/UploadFile/BlogUpload';
import NotFound from '../../Components/NotFound/NotFound';
import toast from 'react-hot-toast';

function EditBlog() {

    const { blogId } = useParams()
    const dispatch = useDispatch();
    const [blog, setBlog] = useState({
        header: "",
      note: "",
      image: null,
    });
    const [isError, setIsError] = useState('')
    const [error, setError] = useState([]);
//--------------------------------------------------------------------
      const handleEvent = (e) => {
        const { name, value } = e.target;
        setBlog({ ...blog, [name]: value, id: blog.trainerId});
      };

      
      const handleImage = (e) => {
        const file = e.target.files[0];
        setBlog({ ...blog, blogImg: file });
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
      
          setError(newError);
          if (Object.keys(newError).length === 0) {
                console.log(blog);
            dispatch(showLoading());
            const response = await trainerApi.post( "/trainer/trainer-Edit-blog",blog,{
                headers: {
                  "Content-Type": "multipart/form-data",
                
              },
            });
            if (response.data.success) {
              dispatch(hideLoading());
              toast.success(response.data.message);
              window.history.back()
            }
          }
          setTimeout(() => {
            setError('')
        },3000);
        } catch (error) {
          dispatch(hideLoading());
          console.error(error);
          setIsError(error.message)
        }
      };
//--------------------------------------------------------------------------

    const fetchBlogDetails = async () => {
        dispatch(showLoading())
        try {
            const response = await trainerApi.post('/trainer/edit-blog', { blogId: blogId })
            if (response.data.success) {
                setBlog(response.data.blog)
                console.log(response.data.blog);
                dispatch(hideLoading())
            }
        } catch (error) {
            console.error(error.message);
            setIsError(error.message)
            dispatch(hideLoading())
        }
    }
    useEffect(() => {
        fetchBlogDetails()
    }, [])

    if(isError){
        return  <NotFound error={isError} />
    }

    return (
        <>
        <BlogUpload  blog={blog}  handleImage={handleImage} handleEvent ={handleEvent }  error={error} handleSubmit={handleSubmit} />

        

        </>
    )
}

export default EditBlog