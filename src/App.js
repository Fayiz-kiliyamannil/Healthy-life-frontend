import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Spinner from './Components/Spinner/spinner';
import AdminRoute from './Routes/AdminRoute';
import './App.css';
import UserRoute from './Routes/UserRoute';
import TrainerRoute from './Routes/TrainerRoute';
import TrainerSignup from './Pages/Trainer/TrainerSignup';
import TrainerLogin from './Pages/Trainer/TrainerLogin/TrainerLogin';
import AdminLogin from './Pages/Admin/AdminLogin';

function App() {
  const { loading } = useSelector(state => state.alerts);

  return (
    <BrowserRouter>
      {loading && (<div className="loader-parent"> <Spinner /> </div>)}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/*" element={<UserRoute/>} />

        <Route path="admin/*" element={<AdminRoute />} />
        <Route path='admin/login' element={<AdminLogin/>}/>

        <Route path="trainer/*" element={<TrainerRoute />} />
        <Route path="trainer/login" element={<TrainerLogin />} />
       <Route path="trainer/register" element={<TrainerSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

