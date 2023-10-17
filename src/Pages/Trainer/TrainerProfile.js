import React, { useEffect,useState } from 'react'
import Trainer_Navbar from '../../Components/Navbar/Trainer_Navbar'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import Profile from '../../Components/Profile/Profile';
import { Outlet } from 'react-router-dom';


function TrainerProfile() {
    const dispatch = useDispatch();
    const [trainer,setTrainer] = useState([]);

    const getTrainer = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/trainer/get-trainer-info', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('trainerToken')
                }
            })
            if (!response.data.success) { 
                dispatch(hideLoading());      
                toast.error(response.data.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
                );
            }else{
                dispatch(hideLoading());
                setTrainer(response.data.trainer)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
        }
    }

    useEffect(()=>{
    getTrainer();
    },[])


    return (
        <>
            <Trainer_Navbar />
            <Profile data={trainer} />
        </>

    )

}

export default TrainerProfile