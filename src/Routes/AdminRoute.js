import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Admin_Navbar from '../Components/Navbar/Admin_Navbar';
import AdminHome from '../Pages/Admin/Admin_Home';
import AdminTrainee from '../Pages/Admin/AdminTrainee';
import User_Details from '../Components/Admin/User_Details';
import Admin_Trainers from '../Pages/Admin/Admin_Trainers';
import New_Trainers from '../Pages/Admin/New_Trainers';
import AdminProtectedRoute from'../Components/ProtectedRoutes/AdminProtectedRoute'
import AdminLogin from '../Pages/Admin/AdminLogin'
import ProUsers from '../Pages/Admin/ProUsers';


function AdminRoute() {
  return (
    <>
        <Routes>
            <Route path='/login' element={<AdminLogin/>}/>
            <Route path="/" element={<AdminProtectedRoute> <AdminHome /> </AdminProtectedRoute>} />
            <Route path="/trainees" element={<AdminProtectedRoute> <AdminTrainee /> </AdminProtectedRoute>} />
            <Route path="/trainees/:userId" element={<AdminProtectedRoute> <User_Details /> </AdminProtectedRoute>} />
            <Route path='/trainees/pro' element={<AdminProtectedRoute> <ProUsers/> </AdminProtectedRoute>}/>
            <Route path="/trainers" element={<AdminProtectedRoute> <Admin_Trainers /> </AdminProtectedRoute>}/>
            <Route path='/newtrainers' element={<AdminProtectedRoute> <New_Trainers /> </AdminProtectedRoute>}/>
            
          
          
        </Routes>
       
    
    </>
  )
}

export default AdminRoute
