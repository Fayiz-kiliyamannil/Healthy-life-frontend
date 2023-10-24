import React, { useEffect, useState } from "react";
import Profile from "../../Components/Profile/Profile";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import client from '../../Utils/axios-utils';
import toast from "react-hot-toast";



function TrainerDetails() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState([]);
  const dispatch = useDispatch();

  const getTrainer = async () => {
    dispatch(showLoading());
    try {
      const response = await client.post('/user/get-trainers-details',{
        id:id
      })
   
      if (response.data.success) {
        setTrainer(response.data.trainer);
        dispatch(hideLoading());
      }
    } catch (error) {
         toast.error(error.message)
        dispatch(hideLoading())
    }
  };
  useEffect(() => {
    getTrainer();
  }, []);

  return (
    <>
      <Profile data={trainer} trainer />
    </>
  );
}

export default TrainerDetails;
