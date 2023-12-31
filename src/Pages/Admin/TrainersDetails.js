import React, { useEffect, useState } from 'react'
import Profile from '../../Components/Admin/Profile'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../Redux/alertSlice';
import toast from 'react-hot-toast';
import adminApi from '../../Utils/admin-axios'

function TrainersDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [trainer, setTrainer] = useState([]);
    const [rating,setRating] = useState(0);
    const [noOfRating,setNoOfRating] = useState(0);


    const getTrainerInfo = async () => {
        dispatch(showLoading());
        try {
            const response = await  adminApi.post("/admin/get-trainer-info", { id: id });
            if (response.data.success) {
                setTrainer(response.data.trainer);
                setNoOfRating(response.data.noOfRating);
                setRating(response.data.rating)
                dispatch(hideLoading());
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
        }
    };

    useEffect(() => {
        getTrainerInfo();
    }, [])


    const action = async () => {
        dispatch(showLoading());
        try {
          const response = await adminApi.post("/admin/trainer-action", {
           id:id
          });
          if (response.data.success) {
            toast.success(response.data.message)
            setTrainer(response.data.trainer);
            console.log(response.data.trainer);
            dispatch(hideLoading());
          }
        } catch (error) {
          toast.error('error')
          dispatch(hideLoading());
          console.error(error);
        }
      };


    return (
        <>

            <Profile data={trainer}  action={action} rating={rating} noOfRating={noOfRating}  trainer admin  />
        </>
    )
}

export default TrainersDetails
