import React from 'react'
import { Navigate } from 'react-router-dom';


function TrainerProtectedRoute(props) {
  
    if(localStorage.getItem('trainerToken')){
        return props.children
    }else{
    return  <Navigate to='/trainer/login'/>
    }
 
}

export default TrainerProtectedRoute
