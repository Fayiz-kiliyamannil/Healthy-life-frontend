import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Admin_Navbar from '../Components/Admin/Admin_Navbar';
import AdminHome from '../Pages/Admin/Admin_Home';
import AdminTrainee from '../Pages/Admin/AdminTrainee';
import User_Details from '../Pages/Admin/User_Details';
import Admin_Trainers from '../Pages/Admin/Admin_Trainers';
import New_Trainers from '../Pages/Admin/New_Trainers';
import AdminProtectedRoute from'../Components/ProtectedRoutes/AdminProtectedRoute';
import New_Trainerdetails from '../Pages/Admin/New_Trainerdetails';
import TrainersDetails from '../Pages/Admin/TrainersDetails';
import Footer from '../Components/Common/Footer/Footer';
import AdminInBox from '../Pages/Admin/Admin_InBox';


function AdminRoute() {
  return (
    <>
     <Admin_Navbar/>
        <Routes>
            <Route path='/' >
             <Route index element={<AdminProtectedRoute> <AdminHome/> </AdminProtectedRoute>}/>
            <Route path="home" element={<AdminProtectedRoute> <AdminHome /> </AdminProtectedRoute>} />
            </Route>
            <Route path="/trainees" element={<AdminProtectedRoute> <AdminTrainee /> </AdminProtectedRoute>} />
            <Route path="/trainees/:userId" element={<AdminProtectedRoute> <User_Details /> </AdminProtectedRoute>} />
            <Route path="/trainers" element={<AdminProtectedRoute> <Admin_Trainers /> </AdminProtectedRoute>}/>
            <Route path='/trainers/:id' element={<AdminProtectedRoute><TrainersDetails/></AdminProtectedRoute>}/>
            <Route path='/newtrainers' element={<AdminProtectedRoute> <New_Trainers /> </AdminProtectedRoute>}/>
            <Route path='/newtrainers/:id' element={<AdminProtectedRoute><New_Trainerdetails/></AdminProtectedRoute>}/>
            <Route path='/inbox' element={<AdminProtectedRoute> <AdminInBox/> </AdminProtectedRoute>}/>
        </Routes>
       <Footer/>
    
    </>
  )
}

export default AdminRoute
