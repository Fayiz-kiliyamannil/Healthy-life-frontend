import React, { useEffect, useState } from "react";
import Admin_Navbar from "../../Components/Navbar/Admin_Navbar";
import Profile from "../../Components/Profile/Profile";
import { Params, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import toast from "react-hot-toast";

function User_Details() {
  const { userId } = useParams();
  const [trainer, setTrainer] = useState([]);
  const dispatch = useDispatch();

  const getTraineeDetails = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.post("/admin/trainee-details", {
        userId: userId,
      });
      if (response.data.success) {
        setTrainer(response.data.trainee);
        dispatch(hideLoading());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const action = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.post("/admin/trainee-action", {
        userId: userId,
      });
      if (response.data.success) {
        toast.success(response.data.message)
        setTrainer(response.data.trainee);
        console.log(response.data.trainee);
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
      <Admin_Navbar />
      <Profile admin action={action} data={trainer} />
    </div>
  );
}

export default User_Details;
