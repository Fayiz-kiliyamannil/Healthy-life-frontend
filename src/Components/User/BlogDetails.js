import React from 'react'

function BlogDetails(props) {
  return (
  <>
   <div className="mx-auto mt-20  rounded-2xl border-gray-800 px-10">
                    <div className="mx-auto grid max-w-2xl gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none ">
                        <article key={props.data._id} className="flex-col items-start justify-between">
                            <div className="p-4 rounded-xl mb-3">
                                <img className="rounded-lg   " src={props.data.blogImg} alt="img" />
                            </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                <img src={props.data.trainerId.profile} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900">
                                        <p className="text-gray-400">{props.data.trainerId.firstname} {props.data.trainerId.lastname}</p>
                                    </p>
                                </div>
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time className="text-gray-500">
                                        {props.data.uploadDate}
                                    </time>
                                </div>
                            </div>
                            <div className="group relative">
                                <h1 className="mt-7 text-2xl font-semibold leading-6 text-gray-200 ">  {props.data.header} </h1>
                                <p className="mt-5 text-lg text-gray-400">{props.data.note}
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
        
  </>
  )
}

export default BlogDetails