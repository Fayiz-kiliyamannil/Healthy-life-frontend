import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../../Components/Admin/Profile";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import { toast } from "react-hot-toast";
import adminApi from '../../Utils/admin-axios';

function New_Trainerdetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [trainer, setNewTrainer] = useState([]);
  const navigate = useNavigate()

  const getNewTrainerInfo = async () => {
    dispatch(showLoading());
    try {
      const response = await adminApi.post("/admin/get-trainer-info", {id:id});
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
      const response = await adminApi.post("/admin/delete-trainer", {
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
      const response = await adminApi.post("/admin/confirm-trainer", {
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
      <Profile data={trainer} delete={deleteNewTrainer} dele confirm={confirm}  />
    </>
  );
}

export default New_Trainerdetails;
