import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query'
import { Toaster } from 'react-hot-toast';
import Spinner from './Components/Common/spinner';
import AdminRoute from './Routes/AdminRoute';
import UserRoute from './Routes/UserRoute';
import TrainerRoute from './Routes/TrainerRoute';
import  VarifiedPage from './Components/Trainer/VerifiedPage'
import './App.css';
const TrainerSignup = React.lazy(()=>import('./Pages/Trainer/TrainerSignup'))
const TrainerLogin = React.lazy(()=>import('./Pages/Trainer/TrainerLogin'))
const AdminLogin = React.lazy(()=>import('./Pages/Admin/AdminLogin'))

export const userContext = React.createContext();
export const trainerChatinfo = React.createContext();
export const usersContext = React.createContext();
export const trainerContext = React.createContext();
const queryClient = new QueryClient()

function App() {

  const [trainerChat, setTrainerChat] = useState([]);
  const [userChat, setUserChat] = useState([])
  const [userInfo, setUserInfo] = useState();
  const [paymentNavigation,setPaymentNavigation] = useState('')
  const [trainerInfo,setTrainerInfo] = useState();
  const { loading } = useSelector(state => state.alerts);

  return (

    <QueryClientProvider client={queryClient} >
      <BrowserRouter>

        <trainerChatinfo.Provider value={{ trainerChat, setTrainerChat }} >
          <userContext.Provider value={{ userChat, setUserChat }} >
           <usersContext.Provider value={{userInfo,setUserInfo,paymentNavigation,setPaymentNavigation}} >
            <trainerContext.Provider value={{trainerInfo,setTrainerInfo}} >

            {loading && (<div className="loader-parent"> <Spinner /> </div>)}
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
              <Route path="/*" element={<UserRoute />} />

              <Route path="admin/*" element={<AdminRoute />} />
              <Route path='admin/login' element={<React.Suspense> <AdminLogin /> </React.Suspense>} />


              <Route path="trainer/*" element={<TrainerRoute />} />
              <Route path="trainer/login" element={<React.Suspense> <TrainerLogin /> </React.Suspense>} />
              <Route path="trainer/register" element={<React.Suspense> <TrainerSignup /> </React.Suspense>} />
              <Route path='trainer/verify' element={<VarifiedPage/>}/>
            </Routes>
              
            </trainerContext.Provider>
           </usersContext.Provider>
          </userContext.Provider>
        </trainerChatinfo.Provider>

      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

