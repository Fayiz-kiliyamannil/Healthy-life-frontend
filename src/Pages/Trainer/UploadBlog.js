import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";

function UploadBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({
    heading: "",
    note: "",
    image: null,
  });
  const [error, setError] = useState([]);
  const dispatch = useDispatch();
  const handleEvent = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value, id: id });
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBlog({ ...blog, blogImg: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = {};
    try {
      if (!blog.heading.trim()) {
        newError.heading = "Heading is Require";
      }
      if (!blog.note.trim()) {
        newError.note = "Content is Require";
      }
      if (!blog.note.trim()) {
        newError.image = "Image is Require";
      }
      setError(newError);

      if (newError.length === 0) {
        dispatch(showLoading());
        const response = await axios.post(
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
          window.location.reload();
        }
      }
      setTimeout(() => {
        setError('')
    },3000);
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  return (
    <>
      <div className="mx-auto w-[70%]  pb-10 ">
        <h1 className="text-[#898989] text-xl text-center font-sans">
          Upload Bolg's
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mt-10  mx-auto md:grid-cols-2  ">
            <div class="flex ">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center   w-full h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                  <span className="text-xs text-[#FA2A55]">{error.heading}</span>
                  <input
                    id="image"
                    type="file"
                    onChange={handleImage}
                    className="hidden"
                  />
                </div>
              </label>
            </div>
            <div>
              <div>
                <label
                  for="website"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Heading
                </label>
                <input
                  type="heading"
                  name="heading"
                  value={blog.heading}
                  onChange={handleEvent}
                  id="website"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your Heading here..."
                />
                <span className="text-xs text-[#FA2A55]">{error.heading}</span>
              </div>
              <div>
                <label
                  for="message"
                  className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your comment
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={blog.note}
                  onChange={handleEvent}
                  rows="7"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your Notes here..."
                ></textarea>
                <span className="text-xs text-[#FA2A55]">{error.note}</span>
              </div>
              <button
                type="submit"
                class="focus:outline-none mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UploadBlog;
