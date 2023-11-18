import React, { useEffect, useState } from 'react'
import TransationTable from '../../Components/Tables/TransationTable'
import TrainerSalesGraph from '../../Components/Graph/TrainerSalesGraph'
import TrainerDashboardCard from '../../Components/Card/TrainerDashboardCard';
import trainerApi from '../../Utils/trainer-axio';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import TrainerSalesTable from '../../Components/Tables/TrainerSalesTable';



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
      <TrainerSalesTable/>
      <TransationTable data={orderInfo} />

    </div>
  )
}

export default TrainerHome;
