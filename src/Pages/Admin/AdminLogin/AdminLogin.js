import React, { useState } from 'react'
import Login from '../../../Components/Login/Signin';
import axios from 'axios';
import toast, { Toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState('')


    const eventSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/admin/login', adminData)
            if (response.data.success) {
                  localStorage.setItem('adminToken',response.data.token.token);
                toast.success(response.data.message, { style: { borderRadius: '10px', background: '#333', color: '#fff' }, });
                navigate('/admin/');
            } else {
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