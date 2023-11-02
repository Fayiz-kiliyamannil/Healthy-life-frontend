import React from 'react'
import { Routes,Route } from 'react-router-dom';
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
import TrainerDetails from '../Pages/User/TrainerDetails';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import NotFound from '../Components/NotFound/NotFound'
import Classes from '../Pages/User/Classes';
import VideoDetails from '../Pages/User/VideoDetails';

function UserRoute() {
    return (
      <>
      <Navbar/>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path="/otp" element={<Otp />} />
            <Route path='/' element={<Home />} />
            <Route path='/trainers' element={<ProtectedRoute><Trainers/></ProtectedRoute>} />
            <Route path='/trainers/:id' element={<ProtectedRoute><TrainerDetails/></ProtectedRoute>}/>
            <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path='/profile/edit/:userId'  element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/blog' element={<ProtectedRoute><Blog/></ProtectedRoute>}/>
            <Route path='/blog/:blogId'  element={<ProtectedRoute><BlogDetails/></ProtectedRoute>}/>
            <Route path='/classes' element={<ProtectedRoute> <Classes/> </ProtectedRoute>}/>
            <Route path='/classes/:videoId' element={<ProtectedRoute><VideoDetails/></ProtectedRoute>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </>
    )
}

export default UserRoute
