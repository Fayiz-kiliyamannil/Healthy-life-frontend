
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
import EditVideo from '../Pages/Trainer/EditVideo';
import TrainerBlogDetails from '../Pages/Trainer/TrainerBlogDetails';
import TrainerVideoDetails from '../Pages/Trainer/TrainerVideoDetails';
import TrainerChat from '../Pages/Trainer/TrainerChat';
import TrainerVideoCall from '../Pages/Trainer/TrainerVideoCall';



function TrainerRoute() {

    return (
        <>
            <TrainerNavbar />
            <Routes>
                <Route path="/home" element={<TrainerProtectedRoute> <TrainerHome /> </TrainerProtectedRoute>} />
                <Route path='/profile' element={<TrainerProtectedRoute> <TrainerProfile /></TrainerProtectedRoute>} />
                <Route path='/profile/edit/:Id' element={<TrainerProtectedRoute><TrainerProfileEdit /></TrainerProtectedRoute>} />
                <Route path='/trainees' element={<TrainerProtectedRoute><TrainerTrainees /></TrainerProtectedRoute>} />
                <Route path='/trainees/:traineeId' element={<TraineesDetails />} />
                <Route path='/upload' element={<TrainerProtectedRoute><TrainerUpload /></TrainerProtectedRoute>}>
                    <Route index element={<UploadBlog />} />
                    <Route path='blog' element={<UploadBlog />} />
                    <Route path='video' element={<UploadVideo />} />
                </Route>
                <Route path='/media' element={<TrainerProtectedRoute><TrainerMedia /></TrainerProtectedRoute>}>
                    <Route index element={<TrainerBlog />} />
                    <Route path='blog' element={<TrainerBlog />} />
                    <Route path='video' element={<TrainerVideo />} />
                </Route>
                <Route path='/blog/edit/:blogId' element={<TrainerProtectedRoute> <EditBlog /> </TrainerProtectedRoute>} />
                <Route path='/video/edit/:videoId' element={<TrainerProtectedRoute><EditVideo /></TrainerProtectedRoute>} />
                <Route path='/media/blog/:blogId' element={<TrainerProtectedRoute><TrainerBlogDetails /></TrainerProtectedRoute>} />
                <Route path='/media/video/:videoId' element={<TrainerProtectedRoute><TrainerVideoDetails /></TrainerProtectedRoute>} />
                <Route path='/message' element={<TrainerProtectedRoute> <TrainerChat /> </TrainerProtectedRoute>}>
                    <Route path=':userId' element={<TrainerProtectedRoute> <TrainerChat /> </TrainerProtectedRoute>} />
                </Route>
                <Route path='/videocall/:userId' element={<TrainerProtectedRoute> <TrainerVideoCall /> </TrainerProtectedRoute>} />
                <Route path='/*' element={<NotFoundAd />} />

            </Routes>
            <Footer />

        </>
    )
}

export default TrainerRoute
