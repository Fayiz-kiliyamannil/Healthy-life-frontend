import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query'
import { Toaster } from 'react-hot-toast';
import Spinner from './Components/Spinner/spinner';
import AdminRoute from './Routes/AdminRoute';
import './App.css';
import UserRoute from './Routes/UserRoute';
import TrainerRoute from './Routes/TrainerRoute';
import TrainerSignup from './Pages/Trainer/TrainerSignup';
import TrainerLogin from './Pages/Trainer/TrainerLogin/TrainerLogin';
import AdminLogin from './Pages/Admin/AdminLogin';
import React, { useState } from 'react';
export const userContext = React.createContext();
export const trainerChatinfo = React.createContext();
export const usersContext = React.createContext();
const queryClient = new QueryClient()

function App() {

  const [trainerChat, setTrainerChat] = useState([]);
  const [userChat, setUserChat] = useState([])
  const [userInfo, setUserInfo] = useState();
  const { loading } = useSelector(state => state.alerts);



  return (

    <QueryClientProvider client={queryClient} >
      <BrowserRouter>

        <trainerChatinfo.Provider value={{ trainerChat, setTrainerChat }} >
          <userContext.Provider value={{ userChat, setUserChat }} >
           <usersContext.Provider value={{userInfo,setUserInfo}} >

           {loading && (<div className="loader-parent"> <Spinner /> </div>)}
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
              <Route path="/*" element={<UserRoute />} />

              <Route path="admin/*" element={<AdminRoute />} />
              <Route path='admin/login' element={<AdminLogin />} />

              <Route path="trainer/*" element={<TrainerRoute />} />
              <Route path="trainer/login" element={<TrainerLogin />} />
              <Route path="trainer/register" element={<TrainerSignup />} />
            </Routes>

           </usersContext.Provider>
          </userContext.Provider>
        </trainerChatinfo.Provider>

      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

