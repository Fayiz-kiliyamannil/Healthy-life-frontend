import React, { useEffect, useState } from 'react'
import Tabs from '../../Components/Navbar/Tabs';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import CardTrainerTrainee  from '../../Components/Card/CardTrainerTrainee'
import adminApi from '../../Utils/admin-axios';
function AdminTrainee() {
    const dispatch = useDispatch()
    const [userData,setUserData] =  useState([])
    const [search, setSearch] = useState([]);

    const userdata = async () => {
      dispatch(showLoading())
        try {
          const response = await adminApi.get('/admin/trainees');
            setUserData(response.data.userData);
            setSearch(response.data.userData);
            dispatch(hideLoading())
        } catch (error) {
          console.error('Error:', error);
          dispatch(hideLoading())
        }
      }
      useEffect(() => {
        userdata();
      }, []);

     

    return (
        <>
           <Tabs trainees={true} all={true} searchValue={search} searchData={setUserData} />
            <CardTrainerTrainee admin data={userData} />
        </>
    )
}

export default AdminTrainee
