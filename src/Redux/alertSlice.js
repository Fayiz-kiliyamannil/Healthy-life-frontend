
import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
name: 'alerts',
initialState:{
    loading : false,
},
reducers:{
    showLoading:(state)=>{
     state.loading = true;
     document.body.style.overflow = 'hidden'
    },
    hideLoading:(state)=>{
        state.loading = false;
        document.body.style.overflow = 'auto';
    }
}

})



export const {showLoading,hideLoading} = alertSlice.actions;

export default alertSlice.reducer;