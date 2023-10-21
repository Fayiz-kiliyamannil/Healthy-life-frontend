import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TrainerSignup from '../Pages/Trainer/TrainerSignup';
import TrainerHome from '../Pages/Trainer/TrainerHome'
import TrainerLogin from '../Pages/Trainer/TrainerLogin/TrainerLogin';
import TrainerProtectedRoute from '../Components/ProtectedRoutes/TrainerProtectedRoute';
import TrainerProfile from '../Pages/Trainer/TrainerProfile';
import TrainerProfileEdit from '../Pages/Trainer/TrainerProfileEdit';
import TrainerTrainees from '../Pages/Trainer/TrainerTrainees';
import TrainerUpload from '../Pages/Trainer/TrainerUpload';
import UploadBlog from '../Pages/Trainer/UploadBlog';
import UploadVideo from '../Pages/Trainer/UploadVideo';
import TraineesDetails from '../Pages/Trainer/TraineesDetails';



function TrainerRoute() {
    return (
        <Routes>
            <Route path="/login" element={<TrainerLogin />} />
            <Route path="/register" element={<TrainerSignup />} />
            <Route path="/" element={<TrainerProtectedRoute> <TrainerHome /> </TrainerProtectedRoute>} />
            <Route path='/profile' element={<TrainerProtectedRoute> <TrainerProfile /></TrainerProtectedRoute>} />
            <Route path='/profile/edit/:Id' element={<TrainerProtectedRoute><TrainerProfileEdit /></TrainerProtectedRoute>} />
            <Route path='/trainees' element={<TrainerProtectedRoute><TrainerTrainees /></TrainerProtectedRoute>} />
            <Route path='/trainees/:traineeId' element={<TraineesDetails />} />
            <Route path='/upload/:id' element={<TrainerProtectedRoute><TrainerUpload /></TrainerProtectedRoute>}>
                <Route index element={<UploadVideo />} />
                <Route path='blog' element={<UploadBlog />} />
                <Route path='video' element={<UploadVideo />} />
            </Route>



        </Routes>
    )
}

export default TrainerRoute
