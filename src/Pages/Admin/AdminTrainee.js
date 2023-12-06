import React, { useEffect, useState } from 'react'
import Tabs from '../../Components/Admin/Tabs';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import CardTrainee  from '../../Components/Admin/CardTrainee'
import adminApi from '../../Utils/admin-axios';
function AdminTrainee() {
    const dispatch = useDispatch()
    const [userData,setUserData] =  useState([])
    const [page,setPage] = useState(1);
    const [noOfPage,setNoOfPage] =  useState();

    const userdata = async () => {
      dispatch(showLoading())
        try {
          const response = await adminApi.post(`/admin/trainees?_limit=8&_page=${page}`);
            setUserData(response.data.value);
            setNoOfPage(response.data.noOfPage)
            dispatch(hideLoading())
        } catch (error) {
          console.error('Error:', error);
          dispatch(hideLoading())
        }
      }
      useEffect(() => {
        userdata();
      }, [page]);


    return (
        <>
           <Tabs trainees={true} page={setNoOfPage} callApi={'trainees'} all={true} fetchApi={userdata} searchData={setUserData} />
            <CardTrainee admin data={userData} />
            {(noOfPage > 1) && (
                <div className='justify-center  flex'>
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px text-sm">
                            <li>
                                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Prev</button>
                            </li>
                            {Array.from({ length: noOfPage }).map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={(e) => {
                                            setPage(index + 1);
                                            e.target.focus();
                                        }}
                                        className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500  border border-gray-700 hover:bg-gray-600  hover:bg-gray-00 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white focus:hover:bg-gray-100  ${page === index + 1 ? 'bg-[#F9951D] text-white' : ''
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button onClick={() => setPage(page + 1)} disabled={page === noOfPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ">Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </>
    )
}

export default AdminTrainee
