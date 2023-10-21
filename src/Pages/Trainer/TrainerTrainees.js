import React, { useEffect, useState } from 'react';
import Trainer_Navbar from '../../Components/Navbar/Trainer_Navbar';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import axios from 'axios';
import CardTrainerTrainee from '../../Components/Card/CardTrainerTrainee';



function TrainerTrainees() {
  const [trainee, setTrainee] = useState([]);
  const dispatch = useDispatch();



  const getTrainee = async (e) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/trainer/get-trainee-info',{}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('trainerToken'),
      }
      })
      if (response.data.success) {
        dispatch(hideLoading())
        setTrainee((response.data.trainee))
        console.log(response.data.trainee);
      }

    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }

  }

  useEffect(() => {
    getTrainee()
  }, [])



  return (
    <>
      <Trainer_Navbar />
       <CardTrainerTrainee  data={trainee} tittle={'Trainees'} />
    </>
  )
}

export default TrainerTrainees
