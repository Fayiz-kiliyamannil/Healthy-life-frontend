import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "../../Components/Profile/Profile";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/alertSlice";
import trainerApi from "../../Utils/trainer-axio";
import toast from "react-hot-toast";

function TraineesDetails() {
  const { traineeId } = useParams();
  const dispatch = useDispatch();
  const [trainee, setTrainee] = useState([]);

  const getTraineeDetails = async () => {
    dispatch(showLoading());
    try {
      const response = await trainerApi.post("/trainer/trainee-details", {
        traineeId: traineeId,
      })
      if (response.data.success) {
        setTrainee(response.data.trainee);
        dispatch(hideLoading());
      }
    } catch (error) {
      console.error(error);
      dispatch(hideLoading())
    }
  };
  useEffect(() => {
    getTraineeDetails();
  }, []);


  const submitDietPlan = async (event) => {
    event.preventDefault();
    dispatch(showLoading())
    try {
       const response  = await trainerApi.post('/trainer/trainee-dietPlan-update',{
        dietPlan:trainee

      })   
      if(response.data.success){
        setTrainee(response.data.trainee)
        toast.success(response.data.message)
        dispatch(hideLoading())
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      dispatch(hideLoading())
    }
  }




  return (
    <>
      <Profile data={trainee} trainer submitDietPlan={submitDietPlan} setData={setTrainee}  />
    </>
  );
}

export default TraineesDetails;
