import React, { useEffect, useState } from "react";
import Profile from "../../Components/Profile/Profile";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import Navbar from "../../Components/Navbar/Navbar";

function TrainerDetails() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState([]);
  const dispatch = useDispatch();

  const getTrainer = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.post("/user/get-trainers-details", {
        id: id,
      });
      if (response.data.success) {
        setTrainer(response.data.trainer);
        console.log(response.data.trainer);
        dispatch(hideLoading());
      }
    } catch (error) {
        dispatch(hideLoading())
      console.error(error);
    }
  };
  useEffect(() => {
    getTrainer();
  }, []);

  return (
    <>
      <Navbar/>
      <Profile data={trainer} trainer />
    </>
  );
}

export default TrainerDetails;
