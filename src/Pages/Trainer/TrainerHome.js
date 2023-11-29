import React, { useEffect, useState } from 'react'
import TransationTable from '../../Components/Trainer/TransationTable'
import TrainerSalesGraph from '../../Components/Trainer/TrainerSalesGraph'
import TrainerDashboardCard from '../../Components/Trainer/TrainerDashboardCard';
import trainerApi from '../../Utils/trainer-axio';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import TrainerSalesTable from '../../Components/Trainer/TrainerSalesTable';



function TrainerHome() {

  const [orderInfo, setOrderInfo] = useState([]);
  const [dashboardInfo,setDashboardInfo] = useState({})
  const dispatch = useDispatch();


  const getTransationDetails = async () => {
    dispatch(showLoading())
    try {
      const response = await trainerApi.get('/trainer/get-dashboard-info')
      if (response.data.success) {
        setOrderInfo(response.data.order);
        setDashboardInfo(response.data.details)
        dispatch(hideLoading());
      }
    } catch (error) {
      console.error(error.message);
      dispatch(hideLoading());
    }
  }
  useEffect(()=>{
getTransationDetails();
  },[])


  return (
    <div>

      <TrainerDashboardCard data={dashboardInfo} />
      <TrainerSalesGraph/>

      <div className=' m-4    rounded-lg  grid  lg:grid-cols-2   mx-auto   '  >
      <TransationTable data={orderInfo} />
      <TrainerSalesTable/>
     
      </div>
      

    </div>
  )
}

export default TrainerHome;
