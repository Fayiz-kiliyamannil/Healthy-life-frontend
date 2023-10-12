import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Login from '../Pages/User/Login';
import Signup from '../Pages/User/Signup'
import Otp from '../Pages/User/Otp'
import Home from '../Pages/User/Home'
import ProtectedRoute from '../Components/ProtectedRoutes/ProtectedRoute';


function UserRoute() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path="/otp" element={<Otp />} />
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
    )
}

export default UserRoute
