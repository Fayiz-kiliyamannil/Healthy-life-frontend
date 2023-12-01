import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import EmptyPage from '../Common/Empty';

function VideoCard(props) {

  if(props.data.length === 0 ){
    return  <EmptyPage/>
  }


  return (
    <>
        <div className=' px-5 sm:px-10' >
        <p className="text-lg leading-8 border-b border-gray-800 pb-6 text-gray-400">
                Learn how to grow your health with our expert advice.
              </p>
        <div className="mx-auto  border-t   border-gray-600   mx-6">
          <div className="mx-auto mt-10  grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10  sm:max-w-none lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {props.data.map((post) => (
              <article key={post._id} className="flex  max-w-xl transition-transform flex-col items-start justify-between">
              <Link to={`${post._id}`} >
              <video className='rounded-lg' muted  onMouseOut={(e)=>e.target.pause()} 
                onMouseOver={(e)=>e.target.play()} >
                  <source src={post.video} />
                </video>
              </Link>
                <div className="group  ">
                  <h3 className=" mt-2 line-clamp-2  font-semibold leading-6 text-gray-300 ">
                    <NavLink to={`${post._id}`}>
                      <span className=" inset-0" />
                      {post.header}
                    </NavLink>
                  </h3>
                  <p className=" line-clamp-1 text-xs leading-6  text-gray-400">{post.note}</p>
                </div>
                    <div className="flex mt-1  items-center gap-x-2 text-xs">
                      <time className="text-gray-500">
                        {post.uploadDate}
                      </time>
                    </div>              

              </article>
            ))}
          </div>
        </div>

        </div>


    </>
  )
}

export default VideoCard