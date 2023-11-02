import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import client from "../../Utils/axios-utils";
import BlogDetail from "../../Components/detailsPage/BlogDetails";


function BlogDetails() {
    const dispatch = useDispatch();
    const { blogId } = useParams();
    const [blog, setBlog] = useState();

    const getBlog = async () => {
        dispatch(showLoading());
        try {
            const response = await client.post('/user/get-blog-details',{blogId:blogId})
            if (response.data.success) {
                setBlog(response.data.blog)
                dispatch(hideLoading());
            }

        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
        }
    }

    useEffect(() => {
        getBlog();
    }, []);

    // Check if the 'blog' object is defined before accessing its properties
    if (!blog) {
        return <div>Loading...</div>; // You can display a loading message or component
    }

    return (
        <>
           <BlogDetail data={blog} />
        </>
    )
}

export default BlogDetails;
