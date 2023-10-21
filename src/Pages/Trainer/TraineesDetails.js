import React, { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import Trainer_Navbar from "../../Components/Navbar/Trainer_Navbar";
import Profile from "../../Components/Profile/Profile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";

function TraineesDetails() {
  const { traineeId } = useParams();
  const dispatch = useDispatch();
  const [trainee, setTrainee] = useState([]);

  const getTraineeDetails = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.post("/trainer/trainee-details", {
        traineeId: traineeId,
      });
      if (response.data.success) {
        setTrainee(response.data.trainee);
        console.log(response.data.trainee);
        dispatch(hideLoading());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTraineeDetails();
  }, []);

  return (
    <>
      <Trainer_Navbar />
      <Profile  data={trainee} />
    </>
  );
}

export default TraineesDetails;
