
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TrainerProtectedRoute from '../Components/ProtectedRoutes/TrainerProtectedRoute'
import Footer from '../Components/Common/Footer/Footer';
import NotFoundAd from '../Components/NotFound/NotfoundAd';


const TrainerHome = React.lazy(() => import('../Pages/Trainer/TrainerHome'));
const TrainerProfile = React.lazy(() => import('../Pages/Trainer/TrainerProfile'))
const TrainerProfileEdit = React.lazy(() => import('../Pages/Trainer/TrainerProfileEdit'))
const TrainerTrainees = React.lazy(() => import('../Pages/Trainer/TrainerTrainees'))
const TrainerUpload = React.lazy(() => import('../Pages/Trainer/TrainerUpload'))
const UploadBlog = React.lazy(() => import('../Pages/Trainer/UploadBlog'))
const UploadVideo = React.lazy(() => import('../Pages/Trainer/UploadVideo'))
const TraineesDetails = React.lazy(() => import('../Pages/Trainer/TraineesDetails'))
const TrainerNavbar = React.lazy(() => import('../Components/Trainer/Trainer_Navbar'))
const TrainerMedia = React.lazy(() => import('../Pages/Trainer/TrainerMedia'))
const TrainerBlog = React.lazy(() => import('../Pages/Trainer/TrainerBlog'))
const TrainerVideo = React.lazy(() => import('../Pages/Trainer/TrainerVideo'))
const EditBlog = React.lazy(() => import('../Pages/Trainer/EditBlog'))
const EditVideo = React.lazy(() => import('../Pages/Trainer/EditVideo'))
const TrainerBlogDetails = React.lazy(() => import('../Pages/Trainer/TrainerBlogDetails'))
const TrainerVideoDetails = React.lazy(() => import('../Pages/Trainer/TrainerVideoDetails'))
const TrainerChat = React.lazy(() => import('../Pages/Trainer/TrainerChat'))
const TrainerVideoCall = React.lazy(() => import('../Pages/Trainer/TrainerVideoCall'))



function TrainerRoute() {

    return (
        <>
            <TrainerNavbar />
            <Routes>
                <Route path="/"  >
                    <Route index element={<React.Suspense> <TrainerProtectedRoute> <TrainerHome /> </TrainerProtectedRoute> </React.Suspense>} />
                    <Route path="home" element={<React.Suspense> <TrainerProtectedRoute> <TrainerHome /> </TrainerProtectedRoute> </React.Suspense>} />
                </Route>
                <Route path='/profile' element={<React.Suspense> <TrainerProtectedRoute> <TrainerProfile /></TrainerProtectedRoute> </React.Suspense>} />
                <Route path='/profile/edit/:Id' element={<React.Suspense>  <TrainerProtectedRoute><TrainerProfileEdit /></TrainerProtectedRoute> </React.Suspense>} />
                <Route path='/trainees' element={<React.Suspense> <TrainerProtectedRoute><TrainerTrainees /></TrainerProtectedRoute> </React.Suspense>} />
                <Route path='/trainees/:traineeId' element={<React.Suspense> <TraineesDetails /> </React.Suspense>} />
                <Route path='/upload' element={<React.Suspense> <TrainerProtectedRoute><TrainerUpload /></TrainerProtectedRoute> </React.Suspense>}>
                    <Route index element={<React.Suspense> <UploadBlog /> </React.Suspense>} />
                    <Route path='blog' element={<React.Suspense> <UploadBlog /> </React.Suspense>} />
                    <Route path='video' element={<React.Suspense><UploadVideo /></React.Suspense>} />
                </Route>
                <Route path='/media' element={<React.Suspense><TrainerProtectedRoute><TrainerMedia /></TrainerProtectedRoute></React.Suspense>}>
                    <Route index element={<React.Suspense><TrainerBlog /> </React.Suspense>} />
                    <Route path='blog' element={<React.Suspense><TrainerBlog /></React.Suspense>} />
                    <Route path='video' element={<React.Suspense> <TrainerVideo /> </React.Suspense>} />
                </Route>
                <Route path='/blog/edit/:blogId' element={<React.Suspense> <TrainerProtectedRoute> <EditBlog /> </TrainerProtectedRoute> </React.Suspense>} />
                <Route path='/video/edit/:videoId' element={<React.Suspense> <TrainerProtectedRoute><EditVideo /></TrainerProtectedRoute> </React.Suspense>} />
                <Route path='/media/blog/:blogId' element={<React.Suspense> <TrainerProtectedRoute><TrainerBlogDetails /></TrainerProtectedRoute> </React.Suspense>} />
                <Route path='/media/video/:videoId' element={<TrainerProtectedRoute><TrainerVideoDetails /></TrainerProtectedRoute>} />
                <Route path='/message' element={<React.Suspense> <TrainerProtectedRoute> <TrainerChat /> </TrainerProtectedRoute> </React.Suspense>}>
                    <Route path=':userId' element={<React.Suspense> <TrainerProtectedRoute> <TrainerChat /> </TrainerProtectedRoute> </React.Suspense>} />
                </Route>
                <Route path='/videocall/:userId' element={<React.Suspense> <TrainerProtectedRoute> <TrainerVideoCall /> </TrainerProtectedRoute> </React.Suspense>} />
                <Route path='/*' element={<NotFoundAd />} />

            </Routes>
            <Footer />

        </>
    )
}

export default TrainerRoute
