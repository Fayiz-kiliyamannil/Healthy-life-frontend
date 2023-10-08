import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import alertSlice  from "./alertSlice";



const store  = configureStore({
  
    reducer:{
        alerts:alertSlice
    },
    // reducer:{
    //  user:userSlice,
    // }

})


export default store;