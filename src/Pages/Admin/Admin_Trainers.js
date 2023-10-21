import React, { useEffect, useState } from 'react'
import Admin_Navbar from '../../Components/Navbar/Admin_Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import Tab from '../../Components/Navbar/Tabs'
import CardTrainerTrainee from '../../Components/Card/CardTrainerTrainee'


function Admin_Trainers() {
  const dispatch = useDispatch();
  const [allTrainer, setAllTrainer] = useState([]);
  const [search, setSearch] = useState([]);



  const allTainerDetails = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get('/admin/trainers');
      setAllTrainer(response.data.trainer);
      setSearch(response.data.trainer);
      dispatch(hideLoading())
    } catch (error) {
      console.log(error);
    }
  }


  const block = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/admin/trainer-block', { trainerId: id });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message, { style: { background: '#333', color: '#fff' } })
        setAllTrainer(response.data.trainer)
      }

    } catch (error) {
      console.error(error);
    }
  }

  const unBlock = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/admin/trainer-unblock', { trainerId: id });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message, { style: { background: '#333', color: '#fff' } })
        setAllTrainer(response.data.trainer)

      }

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    allTainerDetails();
  }, [])

  return (
    <>

      <Admin_Navbar />
      <Tab trainer={true} all={true} searchValue={search} searchData={setAllTrainer} />
      <CardTrainerTrainee data={allTrainer} block={block} admin unBlock={unBlock} />
    </>

  )

}

export default Admin_Trainers
