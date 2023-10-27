import React, { useEffect, useState } from 'react';
import BlogCard from '../../Components/Card/BlogCard';
import client from '../../Utils/axios-utils';
import { useQuery } from 'react-query';
import SpinnerColors from '../../Components/Spinner/spinner';
import NotFound from '../../Components/NotFound/NotFound';


const fetchBlog = async(page)=>{
  return await client.get(`/user/get-user-blog-info?_limit=3&_page=${page}`)
}

function Blog() {
  const[page,setPage] = useState(1)
  const {isLoading,isError,data,isFetching} = useQuery(['fetch-blog',page],()=>fetchBlog(page),{
  keepPreviousData:true
  });

if(isLoading || isFetching){
  return <SpinnerColors/>
}

 if(isError){
  return <NotFound/>
 }
 
  return (
    <>
      <BlogCard  blog={data.data.blog} />
     <div className='justify-center flex'>
      <nav aria-label="Page navigation example">
  <ul className="inline-flex -space-x-px text-sm">
    <li>
      <button onClick={()=>setPage(page=>page-1)} disabled={page === 1} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</button>
    </li>
    {Array.from({ length: data?.data.noOfPage }).map((_, index) => (
        <li key={index}>
         <button
  onClick={(e) => {
    setPage(index + 1);
    e.target.focus();   
  }}
  className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500  border border-gray-700 hover:bg-gray-600  hover:bg-gray-00 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white focus:hover:bg-gray-100  ${
    page === index+1 ? 'bg-[#F5961E] text-white': '' 
  }`}
>
  {index + 1}
</button>
        </li>
      ))}
    <li>
      <button onClick={()=>setPage(page=>page+1)} disabled={page === data.data.noOfPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">Next</button>
    </li>
  </ul>
</nav>
     </div>

    </>
  )
}

export default Blog