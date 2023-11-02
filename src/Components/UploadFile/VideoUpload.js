import React from 'react'

function VideoUpload(props) {
    return (
        <>
            <div className="mx-auto w-[70%] mt-4  pb-10 ">
                <h1 className="text-white  text-center font-sans"> {
                    props.edit ? "Edit-Video" : ' Upload Video '
                } </h1>
                <form onSubmit={props.handleSubmit}>
                    <div className="grid gap-6 mt-10  mx-auto md:grid-cols-2  ">
                        <div className="flex  ">
                            <div className="flex items-center   justify-center w-full">
                                {
                                    props.edit ? (
                                             <div onClick={(e)=> e.target.play()}  >
                                                <video  className=' border border-gray-500 rounded-lg'  controls  src={`http://127.0.0.1:5001/video/${props.videoEdit.video}`}  playsInline  >
                                              </video>
                                             </div>
                                       
                                    ) : (
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400"> Upload video</p>

                                                <span className="text-xs text-[#FA2A55]">{props.error.video}</span>
                                            </div>
                                            <input id="dropzone-file" type="file" onChange={props.handleVideo} className="hidden" />
                                        </label>
                                    )
                                }
                            </div>

                        </div>
                        <div>
                            <div>
                                <label
                                    htmlFor="website"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                                    Heading
                                </label>
                                <input
                                    type="header"
                                    name="header"
                                     value={props.edit ? (props.videoEdit.header) : (props.videoUpload.header) }
                                    onChange={props.handleChange}
                                    id="website"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your Heading here..."
                                />
                                <span className="text-xs text-[#FA2A55]">{props.error.header}</span>
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your comment
                                </label>
                                <textarea
                                    id="note"
                                    name="note"
                                    value={props.edit ? (props.videoEdit.note) : (props.videoUpload.note) }
                                    onChange={props.handleChange}
                                    rows="7"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your Notes here..."
                                ></textarea>
                                <span className="text-xs text-[#FA2A55]">{props.error.note}</span>
                            </div>
                            <button
                                type="submit"
                                className="focus:outline-none mt-4  w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </>
    )
}

export default VideoUpload