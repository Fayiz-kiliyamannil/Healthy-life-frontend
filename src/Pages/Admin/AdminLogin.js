import React, { useState } from 'react'
import Login from '../../Components/Login/Login';
import axios from 'axios';
import toast, { Toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../Redux/alertSlice';

function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState('')


    const eventSubmit = async (event) => {
        event.preventDefault();
        try {
            dispatch(showLoading());
            const response = await axios.post('/admin/login', adminData)
            if (response.data.success) {
                  localStorage.setItem('adminToken',response.data.token.token);
                  dispatch(hideLoading())
                toast.success(response.data.message, { style: { borderRadius: '10px', background: '#333', color: '#fff' }, });
                navigate('/admin/');
            } else {
                dispatch(hideLoading());
                setStatus(response.data.message);
                setTimeout(() => {
                    setStatus('')
                }, 2000)
            }
        } catch (error) {
         console.error(error);   
        }
    }

    return (
        <Login admin={true} eventSubmit={eventSubmit} setData={setAdminData} userStatus={status} />
    )
}

export default AdminLogin