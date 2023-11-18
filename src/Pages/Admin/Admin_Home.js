import React, { useEffect, useState } from 'react';
import TransationTable from '../../Components/Tables/TransationTable';
import SalesGraph from '../../Components/Graph/SalesGraph';
import AdminDashboardCard from '../../Components/Card/AdminDashboardCard';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import adminApi from '../../Utils/admin-axios';
import SalesTable from '../../Components/Tables/SalesTable';

function AdminHome() {
  const [dashboardInfo, setDashboardInfo] = useState({});
  const [orderInfo, setOrderInfo] = useState([]);
  const dispatch = useDispatch();

  const getCardDetails = async () => {
    dispatch(showLoading());
    try {
      const response = await adminApi.get('/admin/get-dashboard-info');
      if (response.data.success) {
        setDashboardInfo(response.data.details);
        setOrderInfo(response.data.order)
        dispatch(hideLoading());
      }
    } catch (error) {
      console.error(error.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getCardDetails();
  }, []);




  return (
    <>
      <AdminDashboardCard data={dashboardInfo} />
      <SalesGraph />
      <SalesTable />
      <TransationTable data={orderInfo} />
    </>
  );
}

export default AdminHome;
