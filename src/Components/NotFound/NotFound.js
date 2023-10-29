
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <main className="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-[#FA2A55]"> {props.error ? (props.error) :'404 Error' } </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-400 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-400">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link onClick={()=>window.history.back()} 
             className="rounded-md bg-[#FA2A55]  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  hover:text-black hover:bg-white ">
              Go back 
            </Link>
            <Link to='contact'
            className="text-sm p-2 hover:border-b  border-gray-700 font-semibold text-gray-100">
              Contact support <span aria-hidden="true">&rarr;</span> 
            </Link>
           
          </div>
        </div>
      </main>
    </>
  )
}

export default NotFound;