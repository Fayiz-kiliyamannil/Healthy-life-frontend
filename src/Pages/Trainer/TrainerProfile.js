import React, { useEffect,useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import Profile from '../../Components/Trainer/Profile';
import trainerApi from '../../Utils/trainer-axio';

function TrainerProfile() {
    const dispatch = useDispatch();
    const [trainer,setTrainer] = useState([]);
    const [rating,setRating] = useState(0);
    const [noOfRating,setNoOfRating] = useState(0);

    const getTrainer = async () => {
        try {
            dispatch(showLoading())
            const response = await trainerApi.post('/trainer/get-trainer-info')
            if (!response.data.success) { 
                toast.error(response.data.message, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
                );
                dispatch(hideLoading());      
            }else{
                setRating(parseInt(response.data.rating));
                setNoOfRating(response.data.countRating);
                setTrainer(response.data.trainer)
                 dispatch(hideLoading());
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
        <Profile data={trainer} rating={rating} noOfRating={noOfRating} edit trainer />
        </>

    )

}

export default TrainerProfile