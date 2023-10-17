import React, { useEffect, useState } from 'react'
import Admin_Navbar from '../../Components/Navbar/Admin_Navbar'
import Card_2 from '../../Components/Card/Card_Trainer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
 import Tab from '../../Components/Navbar/Tabs'

function New_Trainers() {
  const dispatch = useDispatch();
  const[newtrainer,setNewTrainer] = useState([])
  const [search,setSearch]= useState([]);

const newTrainer= async()=>{
  try {  
    dispatch(showLoading());
        const response = await axios.get('/admin/newtrainers');
        setNewTrainer(response.data.newTrainer)
        setSearch(response.data.trainer)
        dispatch(hideLoading());
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
      setNewTrainer(response.data.trainer);
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
      <Tab trainer={true} new={true} searchValue={search} searchData={setNewTrainer}  />
   <Card_2 data={newtrainer} delete={deleteNewTrainer} confirm={confirm}/>
   </>
  )
}

export default New_Trainers
