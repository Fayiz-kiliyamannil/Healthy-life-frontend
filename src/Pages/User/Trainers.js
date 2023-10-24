import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import CardTrainer from '../../Components/Card/CardTrainerTrainee';
import client from '../../Utils/axios-utils'
import toast from 'react-hot-toast';
 
function Trainers() {

    const dispatch = useDispatch();
    const [trainers,setTraienrs] = useState([]);


    const getTrainers = async () => {
        try {
            dispatch(showLoading())
            const response = await client.get('/user/get-trainers');
            if(response.data.success){
            setTraienrs(response.data.trainers)
            }
            dispatch(hideLoading());
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
        }
    }


    useEffect(() => {
        getTrainers();
    }, [])


    return (

        <>
            <CardTrainer tittle={'our team'} data={trainers}/> 
          
        </>

    )
}

export default Trainers