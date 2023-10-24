import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "../../Components/Profile/Profile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import trainerApi from "../../Utils/trainer-axio";

function TraineesDetails() {
  const { traineeId } = useParams();
  const dispatch = useDispatch();
  const [trainee, setTrainee] = useState([]);

  const getTraineeDetails = async () => {
    dispatch(showLoading());
    try {
      const response = await trainerApi.post("/trainer/trainee-details",{
        traineeId: traineeId,
      })
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
      <Profile  data={trainee} />
    </>
  );
}

export default TraineesDetails;
