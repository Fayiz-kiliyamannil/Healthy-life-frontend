import React, { useEffect, useState } from 'react'
import Admin_Navbar from '../../Components/Navbar/Admin_Navbar'
import Profile from '../../Components/Profile/Profile'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../Redux/alertSlice';
import toast from 'react-hot-toast';

function TrainersDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [trainer, setTrainer] = useState([]);
    const navigate = useNavigate()


    const getTrainerInfo = async () => {
        dispatch(showLoading());
        try {
            const response = await axios.post("/admin/get-trainer-info", { id: id });
            if (response.data.success) {
                setTrainer(response.data.trainer);
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
          const response = await axios.post("/admin/trainer-action", {
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
            <Admin_Navbar />
            <Profile data={trainer}  action={action}  trainer admin  />
        </>
    )
}

export default TrainersDetails
