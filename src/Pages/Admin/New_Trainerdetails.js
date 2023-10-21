import React, { useEffect, useState } from "react";
import Admin_Navbar from "../../Components/Navbar/Admin_Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../../Components/Profile/Profile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import { toast } from "react-hot-toast";

function New_Trainerdetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [trainer, setNewTrainer] = useState([]);
  const navigate = useNavigate()

  const getNewTrainerInfo = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.post("/admin/get-new-trainer-info", {id:id});
      if (response.data.success) {
        setNewTrainer(response.data.trainer);
        dispatch(hideLoading());
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  const deleteNewTrainer = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/admin/delete-trainer", {
        trainerId: id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message, {
          style: { background: "#333", color: "#fff" },
        });
        setNewTrainer(response.data.newTrainer);
        navigate('/admin/newtrainers')
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirm = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/admin/confirm-trainer", {
        trainerId: id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message, {
          style: { background: "#333", color: "#fff" },

        });
        setNewTrainer(response.data.trainer);
      navigate('/admin/newtrainers')
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  useEffect(() => {
    getNewTrainerInfo();
  }, []);

  return (
    <>
      <Admin_Navbar />
      <Profile data={trainer} delete={deleteNewTrainer} dele confirm={confirm}  />
    </>
  );
}

export default New_Trainerdetails;
