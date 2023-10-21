import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Tables(props) {

  return (
  <>
<div className="relative m-10 overflow-x-auto rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    #
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                 Gmail
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                   action
                </th>
            </tr>
        </thead>
        <tbody>
          {
            props.data.map((obj,index)=>(
                <tr key={obj._id} className="  hover:bg-gray-700  dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index+1}
                </th>
                <td className="px-6 py-4">
                  {obj.firstname} {obj.lastname}
                </td>
                <td className="px-6 py-4">
                    {obj.email}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                    </div>
                </td>
                <td  className="px-6 py-4 hover:text-[#FA2A55]">
                    <Link to={`${obj._id}`} >  More... </Link>
                 
                </td>
            </tr>
            ))
          }
            
           
        </tbody>
    </table>
</div>

  </>

  )
}

export default Tables;
