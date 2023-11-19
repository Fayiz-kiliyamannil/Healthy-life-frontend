import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../Redux/alertSlice'
import Tab from '../../Components/Admin/Tabs'
import CardTrainee from '../../Components/Admin/CardTrainee'
import adminApi from '../../Utils/admin-axios'

function Admin_Trainers() {
  const dispatch = useDispatch();
  const [allTrainer, setAllTrainer] = useState([]);
  const [search, setSearch] = useState([]);



  const allTainerDetails = async () => {
    dispatch(showLoading())
    try {

      const response = await adminApi.get('/admin/trainers');
      setAllTrainer(response.data.trainer);
      setSearch(response.data.trainer);
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
    }
  }

  useEffect(() => {
    allTainerDetails();
  },[])

  return (
    <>
      <Tab trainer={true} all={true} searchValue={search} searchData={setAllTrainer} />
      <CardTrainee data={allTrainer}  admin />
    </>

  )

}

export default Admin_Trainers
