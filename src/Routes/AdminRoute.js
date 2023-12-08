import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AdminNavbar from '../Components/Admin/Admin_Navbar';
import AdminProtectedRoute from '../Components/ProtectedRoutes/AdminProtectedRoute';
import Footer from '../Components/Common/Footer/Footer';
import NotFound from '../Components/NotFound/NotFound';
const AdminHome = React.lazy(() => import('../Pages/Admin/Admin_Home'))
const AdminTrainee = React.lazy(() => import('../Pages/Admin/AdminTrainee'))
const UserDetails = React.lazy(() => import('../Pages/Admin/User_Details'))
const AdminTrainers = React.lazy(() => import('../Pages/Admin/Admin_Trainers'))
const NewTrainers = React.lazy(() => import('../Pages/Admin/New_Trainers'))
const NewTrainerdetails = React.lazy(() => import('../Pages/Admin/New_Trainerdetails'))
const TrainersDetails = React.lazy(() => import('../Pages/Admin/TrainersDetails'))
const AdminInBox = React.lazy(() => import('../Pages/Admin/Admin_InBox'))

function AdminRoute() {
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path='/' >
          <Route index element={<React.Suspense> <AdminProtectedRoute> <AdminHome /> </AdminProtectedRoute> </React.Suspense>} />
          <Route path="home" element={<React.Suspense> <AdminProtectedRoute> <AdminHome /> </AdminProtectedRoute> </React.Suspense>} />
        </Route>
        <Route path="/trainees" element={<React.Suspense> <AdminProtectedRoute> <AdminTrainee /> </AdminProtectedRoute> </React.Suspense>} />
        <Route path="/trainees/:userId" element={<React.Suspense> <AdminProtectedRoute> <UserDetails /> </AdminProtectedRoute> </React.Suspense>} />
        <Route path="/trainers" element={<React.Suspense> <AdminProtectedRoute> <AdminTrainers /> </AdminProtectedRoute> </React.Suspense>} />
        <Route path='/trainers/:id' element={<React.Suspense> <AdminProtectedRoute><TrainersDetails /></AdminProtectedRoute> </React.Suspense>} />
        <Route path='/newtrainers' element={<React.Suspense> <AdminProtectedRoute> <NewTrainers /> </AdminProtectedRoute> </React.Suspense>} />
        <Route path='/newtrainers/:id' element={<React.Suspense> <AdminProtectedRoute><NewTrainerdetails /></AdminProtectedRoute> </React.Suspense>} />
        <Route path='/inbox' element={<React.Suspense> <AdminProtectedRoute> <AdminInBox /> </AdminProtectedRoute> </React.Suspense>} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer />

    </>
  )
}

export default AdminRoute
