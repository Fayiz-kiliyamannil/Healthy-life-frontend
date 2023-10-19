import { NavLink } from "react-router-dom";



  
 function BlogCard(props) {

   


    return (
      <div className=" py-20   sm:py-20">
        <div className="mx-auto  max-w-7xl px-6 lg:px-8">
            
            <p className="text-lg leading-8 border-b border-gray-700 pb-6 text-gray-400">
              Learn how to grow your health with our expert advice.
            </p>
         
          <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16  sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {props.blog.map((post) => (
              <article key={post._id}  className="flex  max-w-xl transition-transform transform p-3  hover:scale-105   bg-[#15171C]  rounded-lg   flex-col items-start justify-between">

                <div className="   rounded-xl mb-3 ">
                <img className="rounded-lg " src={`http://127.0.0.1:5001/profileImage/${post.blogImg}`} alt="img" />
                </div>
                 
                <div className="group  relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-200  group-hover:text-gray-400">
                    <NavLink to={`/blog/${post._id}`}>
                      <span className="absolute inset-0" />
                      {post.header}
                    </NavLink>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6  text-gray-400">{post.note}</p>
                </div>                
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={`http://127.0.0.1:5001/profileImage/${post.trainerId.profile}`} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <NavLink to={`/blog/${post._id}`}>
                        <span className="absolute inset-0" />
                      <p className="text-gray-400">{post.trainerId.firstname} {post.trainerId.lastname} </p>
                      </NavLink>
                    </p>
                    <div className="flex items-center gap-x-4 text-xs">
                  <time className="text-gray-500">
                    {post.uploadDate}
                  </time>
                </div>
                  </div>
                </div>
                
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  

  export default BlogCard