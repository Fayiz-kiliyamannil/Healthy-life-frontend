import React, { useEffect, useState } from 'react'
import Nav_Bar from '../../Components/Navbar/Navbar'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';
import Card_2 from '../../Components/Card/Card_2';
import Card from '../../Components/Card/card'
function Trainers() {

    const dispatch = useDispatch();
    const [trainers,setTraienrs] = useState([]);


    const getTrainers = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('/user/get-trainers');
            setTraienrs(response.data.trainers)


            dispatch(hideLoading());
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getTrainers();
    }, [])


    return (

        <>
            <Nav_Bar />

        </>

    )
}

export default Trainers