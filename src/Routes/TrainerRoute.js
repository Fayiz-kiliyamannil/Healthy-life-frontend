import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TrainerHome from '../Pages/Trainer/TrainerHome'
import TrainerProtectedRoute from '../Components/ProtectedRoutes/TrainerProtectedRoute';
import TrainerProfile from '../Pages/Trainer/TrainerProfile';
import TrainerProfileEdit from '../Pages/Trainer/TrainerProfileEdit';
import TrainerTrainees from '../Pages/Trainer/TrainerTrainees';
import TrainerUpload from '../Pages/Trainer/TrainerUpload';
import UploadBlog from '../Pages/Trainer/UploadBlog';
import UploadVideo from '../Pages/Trainer/UploadVideo';
import TraineesDetails from '../Pages/Trainer/TraineesDetails';
import TrainerNavbar from '../Components/Navbar/Trainer_Navbar';
import Footer from '../Components/Footer/Footer';
import NotFoundAd from '../Components/NotFound/NotfoundAd';
import TrainerMedia from '../Pages/Trainer/TrainerMedia';
import TrainerBlog from '../Pages/Trainer/TrainerBlog';
import TrainerVideo from '../Pages/Trainer/TrainerVideo';
import EditBlog from '../Pages/Trainer/EditBlog';


function TrainerRoute() {
    return (
        <>
            <TrainerNavbar />
            <Routes>
                <Route path="/" element={<TrainerProtectedRoute> <TrainerHome /> </TrainerProtectedRoute>} />
                <Route path='/profile' element={<TrainerProtectedRoute> <TrainerProfile /></TrainerProtectedRoute>} />
                <Route path='/profile/edit/:Id' element={<TrainerProtectedRoute><TrainerProfileEdit /></TrainerProtectedRoute>} />
                <Route path='/trainees' element={<TrainerProtectedRoute><TrainerTrainees /></TrainerProtectedRoute>} />
                <Route path='/trainees/:traineeId' element={<TraineesDetails />} />
                <Route path='/upload/:id' element={<TrainerProtectedRoute><TrainerUpload /></TrainerProtectedRoute>}>
                    <Route index element={<UploadBlog />} />
                    <Route path='blog' element={<UploadBlog />} />
                    <Route path='video' element={<UploadVideo />} />
                </Route>
                <Route path='/media/:id' element={<TrainerProtectedRoute><TrainerMedia /></TrainerProtectedRoute>}>
                    <Route index element={<TrainerBlog />} />
                    <Route path='blog' element={<TrainerBlog />} />
                    <Route path='video' element={<TrainerVideo />} />
                </Route>
                 <Route path='/blog/edit/:blogId' element={<EditBlog/>}/>
                <Route path='/*' element={<NotFoundAd />} />
            </Routes>
            <Footer />

        </>
    )
}

export default TrainerRoute
