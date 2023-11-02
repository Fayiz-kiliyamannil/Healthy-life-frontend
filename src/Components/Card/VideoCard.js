import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

function VideoCard(props) {
  const [isOpen, setIsOpen] = useState({});

  const toggleMenu = (id) => {
    setIsOpen((prev) => ({
      [id]: !prev[id]
    }))
  }


  return (
    <>
      <div className=" py-20   sm:py-20">
        <div className="mx-auto   px-6">
          <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10  sm:max-w-none lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {props.data.map((post) => (
              <article key={post._id} className="flex  max-w-xl transition-transform flex-col items-start justify-between">
              <Link to={`/trainer/media/video${post._id}`} >
              <video className='rounded-lg' muted  onMouseOut={(e)=>e.target.pause()} 
                onMouseOver={(e)=>e.target.play()} >
                  <source src={`http://127.0.0.1:5001/video/${post.video}`} />
                </video>
              </Link>
                <div className="group  ">
                  <h3 className="mt-3 line-clamp-1 text-lg font-semibold leading-6 text-gray-200 ">
                    <NavLink to={`/trainer/media/video${post._id}`}>
                      <span className=" inset-0" />
                      {post.header}
                    </NavLink>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6  text-gray-400">{post.note}</p>
                </div>
                    <div className="flex  items-center gap-x-2 text-xs">
                      <time className="text-gray-500">
                        {post.uploadDate}
                      </time>
                    </div>
                {
                  props.trainer ? (
                    <div className="relative w-5 h-5  ml-[100%] inline-block ">
                      <button
                        onClick={() => toggleMenu(post._id)}
                        type="button"
                        className="text-gray-500 text-center "
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512">
                          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" fill="#ffffff" />
                        </svg>
                      </button>
                      {isOpen[post._id] && (
                        <div className="origin-top-right  absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#15171C] ring-1 ring-black ring-opacity-5">
                          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <Link to={`/trainer/video/edit/${post._id}`} className="block px-4 py-2 text-sm text-gray-100" role="menuitem">
                              Edit
                            </Link>
                            <button onClick={() => props.deleteVideo(post._id)} className="block px-4 py-2 text-sm text-gray-100" role="menuitem">
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                  ) : ''
                }

              </article>
            ))}
          </div>
        </div>
      </div>


    </>
  )
}

export default VideoCard