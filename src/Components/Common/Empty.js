import React from 'react';

const EmptyPage = () => {
  return (
 

      <div className="flex items-center justify-center h-screen">
      <div className='text-center mb-20  px-6  ' >

        <h4 className="text-lg font-medium text-gray-300 mb-3">Empty..!</h4>
        <p className="text-sm font-medium text-red-400  mb-4"> Seems like this page is empty for now.
        </p>
        <button onClick={()=> window.history.back()}   className="text-white ml-3   bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5  ">back</button>
      </div>
    </div>

  );
};

export default EmptyPage;