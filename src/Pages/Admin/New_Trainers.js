import React, { useEffect, useState } from 'react'
import Admin_Navbar from '../../Components/Navbar/Admin_Navbar'
import Card_2 from '../../Components/Card/Card_2'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'

function New_Trainers() {
  const dispatch = useDispatch();
  const[newtrainer,setNewTrainer] = useState([])

const newTrainer= async()=>{
  try {
        const response = await axios.get('/admin/newtrainers');
        setNewTrainer(response.data.newTrainer)
  } catch (error) {
    console.log(error);
  }
}


const confirm = async(id)=>{
  try {
      dispatch(showLoading())
      const response = await axios.post('/admin/confirm-trainer',{trainerId:id})
      dispatch(hideLoading())
      if(response.data.success) {
      toast.success(response.data.message,{ style:{background:'#333',color:'#fff'} })
      setNewTrainer(response.data.trainer)
      }
  } catch (error) {
    dispatch(hideLoading());
  console.error(error);
  }

}

const deleteNewTrainer = async(id)=>{
  try {
    dispatch(showLoading());
    const response = await axios.post('/admin/delete-trainer',{trainerId:id});
    dispatch(hideLoading());
    if(response.data.success){
      toast.success(response.data.message,{ style:{background:'#333',color:'#fff'} });
      setNewTrainer(response.data.newTrainer);
    }
  } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
newTrainer();
},[])


  return (
   <>
      <Admin_Navbar/>
     <nav className="flex m-5" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to='/admin/trainers' >
                <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                  Triners
                </a>
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 9 4-4-4-4" />
                </svg>
                <Link to='/admin/newtrainers' >
                  <a className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">New Trainers</a>
                </Link>
              </div>
            </li>
          </ol>
        </nav>
  
   <Card_2 data={newtrainer} delete={deleteNewTrainer} confirm={confirm}/>
   </>
  )
}

export default New_Trainers