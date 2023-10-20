import React from 'react'
import { Routes,Route, Router } from 'react-router-dom';
import Login from '../Pages/User/Login';
import Signup from '../Pages/User/Signup'
import Otp from '../Pages/User/Otp'
import Home from '../Pages/User/Home'
import ProtectedRoute from '../Components/ProtectedRoutes/ProtectedRoute';
import Trainers from '../Pages/User/Trainers';
import Profile from '../Pages/User/Profile';
import EditProfile from '../Pages/User/EditProfile';
import Contact from '../Pages/User/Contact';
import Blog from '../Pages/User/Blog';
import BlogDetails from '../Pages/User/BlogDetails';
   

function UserRoute() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path="/otp" element={<Otp />} />
            <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/Trainers' element={<ProtectedRoute><Trainers/></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path='/profile/edit/:userId'  element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
            <Route path='/contact' element={<ProtectedRoute><Contact/></ProtectedRoute>}/>
            <Route path='/blog' element={<ProtectedRoute><Blog/></ProtectedRoute>}/>
            <Route path='/blog/:blogId'  element={<ProtectedRoute><BlogDetails/></ProtectedRoute>}/>
        </Routes>
    )
}

export default UserRoute
