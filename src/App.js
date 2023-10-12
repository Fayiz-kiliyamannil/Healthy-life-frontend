import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/User/Login";
// import Signin from "./Components/Login/Signin";
import Signup from "./Pages/User/Signup";
import Home from './Pages/User/Home';
import Otp from './Components/Otp/Otp'
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Spinner from "./Components/Spinner/spinner"
import AdminLogin from "./Pages/Admin/AdminLogin/AdminLogin";
import AdminHome from "./Pages/Admin/AdminHome/adminHome";
import AdminProtectedRoute from "./Components/ProtectedRoutes/AdminProtectedRoute";
import AdminTrainee from "./Pages/Admin/AdminTrainees/AdminTrainee";
import './App.css';
import User_Details from "./Components/Admin/User_Details";
import TrainerLogin from "./Pages/Trainer/TrainerLogin/TrainerLogin";
import TrainerSignup from "./Pages/Trainer/TrainerSignup";
import TrainerHome from "./Pages/Trainer/TrainerHome";


function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <BrowserRouter>
      {loading && (<div className="loader-parent"> <Spinner /> </div>)}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        //User-Route
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />


         // Admin-Route
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/" element={<AdminProtectedRoute> <AdminHome/> </AdminProtectedRoute>}/>
        <Route path="/admin/trainees" element={<AdminProtectedRoute> <AdminTrainee/> </AdminProtectedRoute>} /> 
        <Route path="/admin/trainees/:userId" element={<AdminProtectedRoute> <User_Details/> </AdminProtectedRoute>} />

        //Trainer-Login
        <Route path="/trainer/login" element={<TrainerLogin/>}/>
        <Route path="/trainer/register" element={<TrainerSignup/>}/>
        <Route  path="/trainer/home" element={<TrainerHome/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
