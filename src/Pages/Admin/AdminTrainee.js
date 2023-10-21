import React, { useEffect, useState } from 'react'
import Admin_Navbar from '../../Components/Navbar/Admin_Navbar';
import Tables from '../../Components/Tables/Tables';
import axios from 'axios';
import Tabs from '../../Components/Navbar/Tabs';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import CardTrainerTrainee  from '../../Components/Card/CardTrainerTrainee'

function AdminTrainee() {
    const dispatch = useDispatch()
    const [userData,setUserData] =  useState([])
    const [search, setSearch] = useState([]);

    const userdata = async () => {
        try {
          dispatch(showLoading())
          const response = await axios.get('/admin/trainees');
            setUserData(response.data.userData);
            setSearch(response.data.userData);
            console.log(response.data.userData);
            dispatch(hideLoading())
        } catch (error) {
          console.error('Error:', error);
        }
      }
      useEffect(() => {
        userdata();
      }, []);

     

    return (
        <>
           <Admin_Navbar/>
           <Tabs trainees={true} all={true} searchValue={search} searchData={setUserData} />
            <CardTrainerTrainee admin data={userData} />
           
    
        </>
    )
}

export default AdminTrainee
