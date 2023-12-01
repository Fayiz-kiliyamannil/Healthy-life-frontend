import axios from "axios";
import { url } from "./url";


const trainerApi = axios.create({
    baseURL:url //  our api base url
})


trainerApi.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('trainerToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
);


export default trainerApi;