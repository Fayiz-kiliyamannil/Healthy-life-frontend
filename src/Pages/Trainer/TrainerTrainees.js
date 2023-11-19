import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import CardTrainee from '../../Components/Trainer/CardTrainee';
import trainerApi from '../../Utils/trainer-axio';


function TrainerTrainees() {
  const [trainee, setTrainee] = useState([]);
  const dispatch = useDispatch();

  const getTrainee = async (e) => {
    try {
      dispatch(showLoading());
      const response = await trainerApi.post('/trainer/get-trainee-info')
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
       <CardTrainee  data={trainee} tittle={'Trainees'} />
    </>
  )
}

export default TrainerTrainees;
