import React from 'react'

function videoDetails(props) {
    return (
        <div className="mx-auto mt-20 max-w-7xl rounded-2xl lg:px-8">
        <div className="mx-auto grid  gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none">
          <article key={props.data?._id} className="flex flex-col  justify-between">
            <div className="p-4 rounded-xl mb-3">
              <video className="h-full w-full rounded-md" src={props.data?.video} type="video/mp4" controls></video>
            </div>
            <div className="relative flex justify-between gap-x-4">
              <div className="flex pl-6 text-xs">
                <time className="text-gray-500">
                  {props.data?.uploadDate}
                </time>
              </div>
            </div>
            <div className="group mx-5 relative">
              <h1 className="mt-7 text-2xl font-semibold leading-6 text-gray-200">{props.data?.header}</h1>
              <p className="mt-5 text-lg text-gray-400">{props.data?.note}</p>
            </div>
          </article>
        </div>
      </div>
      
    )
}

export default videoDetails