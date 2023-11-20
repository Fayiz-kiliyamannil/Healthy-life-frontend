import React from 'react'
import { Routes,Route } from 'react-router-dom';
import ProtectedRoute from '../Components/ProtectedRoutes/ProtectedRoute';
import Navbar from '../Components/User/Navbar';
import Footer from '../Components/Common/Footer/Footer';
import NotFound from '../Components/NotFound/NotFound'
const Login = React.lazy(()=>import('../Pages/User/Login'))
const Signup = React.lazy(()=> import('../Pages/User/Signup'))
const Blog = React.lazy(()=>import('../Pages/User/Blog'))
const Otp = React.lazy(()=>import('../Pages/User/Otp'))
const Home = React.lazy(()=>import('../Pages/User/Home'))
const Profile = React.lazy(()=>import('../Pages/User/Profile'))
const EditProfile =  React.lazy(()=>import('../Pages/User/EditProfile'))
const Contact = React.lazy(()=>import('../Pages/User/Contact'))
const BlogDetails = React.lazy(()=> import('../Pages/User/BlogDetails'))
const TrainerDetails = React.lazy(()=> import('../Pages/User/TrainerDetails'))
const Classes  = React.lazy(()=>import('../Pages/User/Classes'))
const VideoDetails =  React.lazy(()=>import('../Pages/User/VideoDetails'))
const Chat = React.lazy(()=>import('../Pages/User/Chat'))
const VideoCall = React.lazy(()=> import('../Pages/User/videoCall'))
const Trainers  = React.lazy(()=> import('../Pages/User/Trainers') )

function UserRoute() {
    return (
      <>
      <Navbar/>
        <Routes>
            <Route path='/login' element={<React.Suspense> <Login /> </React.Suspense>} /> 
            <Route path='/register' element={<React.Suspense> <Signup /> </React.Suspense>} />
            <Route path="/otp" element={<React.Suspense> <Otp /> </React.Suspense>} />
            <Route path='/' element={<React.Suspense> <Home /> </React.Suspense>} />
            <Route path='/trainers' element={<React.Suspense > <ProtectedRoute><Trainers/></ProtectedRoute>  </React.Suspense>} />
            <Route path='/trainers/:id' element={<React.Suspense> <ProtectedRoute><TrainerDetails/></ProtectedRoute> </React.Suspense>}/>
            <Route path='/profile' element={<React.Suspense> <ProtectedRoute><Profile/></ProtectedRoute> </React.Suspense>}/>
            <Route path='/profile/edit/:userId'  element={<React.Suspense> <ProtectedRoute><EditProfile/></ProtectedRoute> </React.Suspense>}/>
            <Route path='/contact' element={<React.Suspense> <Contact/> </React.Suspense>}/>
            <Route path='/blog' element={<React.Suspense> <ProtectedRoute><Blog/></ProtectedRoute> </React.Suspense>}/>
            <Route path='/blog/:blogId'  element={<React.Suspense> <ProtectedRoute><BlogDetails/></ProtectedRoute> </React.Suspense>}/>
            <Route path='/classes' element={<React.Suspense> <ProtectedRoute> <Classes/> </ProtectedRoute> </React.Suspense>}/>
            <Route path='/classes/:videoId' element={<React.Suspense> <ProtectedRoute><VideoDetails/></ProtectedRoute> </React.Suspense>}/>
            <Route path='classes/chat' element={<React.Suspense> <ProtectedRoute> <Chat/> </ProtectedRoute> </React.Suspense>}/>
            <Route path='classes/videocall' element={<React.Suspense> <ProtectedRoute><VideoCall/></ProtectedRoute> </React.Suspense>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </>
    )
}

export default UserRoute
