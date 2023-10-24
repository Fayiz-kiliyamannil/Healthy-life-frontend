import React, { useEffect, useState } from "react";
import Profile from "../../Components/Profile/Profile";
import {  useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import toast from "react-hot-toast";
import  adminApi from '../../Utils/admin-axios';


function User_Details() {
  const { userId } = useParams();
  const [trainer, setTrainer] = useState([]);
  const dispatch = useDispatch();

  const getTraineeDetails = async () => {
    dispatch(showLoading());
    try {
      const response = await adminApi.post("/admin/trainee-details", {
        id: userId,
      });
      if (response.data.success) {
        setTrainer(response.data.trainee);
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  const action = async () => {
    dispatch(showLoading());
    try {
      const response = await adminApi.post("/admin/trainee-action", {
        id: userId,
      });
      if (response.data.success) {
        toast.success(response.data.message)
        setTrainer(response.data.trainee);
        dispatch(hideLoading());
      }
    } catch (error) {
      toast.error('error')
      dispatch(hideLoading());
      console.error(error);
    }
  };

  useEffect(() => {
    getTraineeDetails();
  }, []);

  return (
    <div>
      <Profile admin action={action} data={trainer} />
    </div>
  );
}

export default User_Details;
