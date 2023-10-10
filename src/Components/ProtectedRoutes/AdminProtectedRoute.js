import React from 'react'
import { Navigate } from 'react-router-dom'
function AdminProtectedRoute(props) {
    if(localStorage.getItem('adminToken')){
      return  props.children
    }else{
       return  <Navigate to='/admin/login'/>
    }
 
}

export default AdminProtectedRoute;