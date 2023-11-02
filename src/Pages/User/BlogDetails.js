import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import client from "../../Utils/axios-utils";


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
           
                <div className="mx-auto mt-20 pt-7 max-w-7xl bg-[#15171C] border-x rounded-2xl border-gray-800 lg:px-8">
                    <div className="mx-auto grid max-w-2xl gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none ">
                        <article key={blog._id} className="flex-col items-start justify-between">
                            <div className="p-4 rounded-xl mb-3">
                                <img className="rounded-lg   " src={`http://127.0.0.1:5001/image/${blog.blogImg}`} alt="img" />
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4">
                                <img src={`http://127.0.0.1:5001/profileImage/${blog.trainerId.profile}`} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900">
                                        <p className="text-gray-400">{blog.trainerId.firstname} {blog.trainerId.lastname}</p>
                                    </p>
                                </div>
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time className="text-gray-500">
                                        {blog.uploadDate}
                                    </time>
                                </div>
                            </div>
                            <div className="group relative">
                                <h1 className="mt-7 text-2xl font-semibold leading-6 text-gray-200 ">  {blog.header} </h1>
                                <p className="mt-5 text-lg text-gray-400">{blog.note}
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
        
        </>
    )
}

export default BlogDetails;
