import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../../Redux/alertSlice'
import AdminAxios  from '../../Utils/admin-axios'
import AdminNotFound from '../NotFound/NotfoundAd'
import EmptyPage from '../Common/Empty'


function InboxTable() {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [messageId,setMessageId] = useState('')
    const [isError,setIsError] = useState('')
    const [message,setMessage] = useState([])



const fetchMessage = async ()=>{
try {
    dispatch(showLoading())
    const response = await AdminAxios.get('/admin/fetch-inbox');
    if(response.data.success){
    setMessage(response.data.contacts);
    dispatch(hideLoading())
    }
} catch (error) {
    error(error.message)
    dispatch(hideLoading());
    setIsError(error.message)
}
}
const forDeleteMessage=async(id)=>{
    try {
        dispatch(showLoading())
        const response =  await AdminAxios.put(`/admin/delete-message/${id}`)
        if(response.data.success){
            setMessage(response.data.contacts)
            dispatch(hideLoading())
            }
    } catch (error) {
        error(error.message)
        dispatch(hideLoading());
        setIsError(error.message)
    }
}

useEffect(()=>{
fetchMessage();
},[])


if(isError){
    return <AdminNotFound/>
}

if(message.length === 0){   
   return <EmptyPage/>
}
 

const FloatingMessage = () => { // FLOWTING----TO SEE INDIVID   
    const selectedMessage = message.find(obj => obj._id === messageId); 
    return (
        <div className="fixed inset-0 flex justify-center items-center">
            <div className="w-[60%] h-[40%] bg-gray-400 shadow-md rounded-md">
                <button onClick={() => setIsOpen(!isOpen)} className="text-sm text-red-500 p-2 cursor-pointer">
                    Close
                </button>
                <div className="mx-4">
                    <h1 className="font-medium upper-case pb-1 text-xl px-1 border-gray-600 border-b text-black">
                        MESSAGE
                    </h1>
                    {selectedMessage && (
                        <p className="text-black mt-1 text-lg">
                            {selectedMessage.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};


const toggleMessage =(id)=>{
    setMessageId(id)   
    setIsOpen(!isOpen);
}

    return (
        <>
            <div className=" flex justify-center  overflow-x-auto shadow-md  sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                MESSAGE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DATE
                            </th>
                            <th scope="col" className="px-6 py-3">    

                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        message?.map((obj,index)=>(
                            <tr key={obj._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th  scope="row" onClick={()=>toggleMessage(obj._id)}  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {obj.name}
                                <p className='text-sm text-gray-400 ' >{obj.email}</p>
                            </th>
                            <td className="px-6   py-4" onClick={()=>toggleMessage(obj._id)}>
                               {obj.message.slice(0,30)}
                            </td>
                            <td className="px-6 py-4">
                                {obj.date}
                            </td>
                            <td className="px-6 py-4">
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={()=>forDeleteMessage(obj._id)} >
                                    <svg className="w-5 h-5 text-gray-800 dark:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                                    </svg>
                                </button>
                            </td>  
                            {isOpen && (
                                <FloatingMessage />
                            )}
                        </tr>
                        ))
                       }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default InboxTable
