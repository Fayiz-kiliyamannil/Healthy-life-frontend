import React from 'react'
import { Routes,Route } from 'react-router-dom'
import  TrainerSignup from '../Pages/Trainer/TrainerSignup';
import TrainerHome  from '../Pages/Trainer/TrainerHome'
import TrainerLogin from  '../Pages/Trainer/TrainerLogin/TrainerLogin';




function TrainerRoute() {
    return (
        <Routes>
            <Route path="/login" element={<TrainerLogin />} />
            <Route path="/register" element={<TrainerSignup />} />
            <Route path="/trainer" element={<TrainerHome />} />
        </Routes>
    )
}

export default TrainerRoute
