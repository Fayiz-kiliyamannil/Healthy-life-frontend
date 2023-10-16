import React from 'react'
import { Routes,Route } from 'react-router-dom'
import  TrainerSignup from '../Pages/Trainer/TrainerSignup';
import TrainerHome  from '../Pages/Trainer/TrainerHome'
import TrainerLogin from  '../Pages/Trainer/TrainerLogin/TrainerLogin';
import TrainerProtectedRoute from '../Components/ProtectedRoutes/TrainerProtectedRoute';




function TrainerRoute() {
    return (
        <Routes>
            <Route path="/login" element={<TrainerLogin />} />
            <Route path="/register" element={<TrainerSignup />} />
            <Route path="/" element={<TrainerProtectedRoute><TrainerHome /></TrainerProtectedRoute>} />
            
        </Routes>
    )
}

export default TrainerRoute
