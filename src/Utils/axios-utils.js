import axios from "axios";
import { url } from "./url";



const client = axios.create({
    baseURL: url //  our api base url
})

  //req interceptor for adding the bearer token
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=> {
        return  Promise.reject(error)
    }
);


export default client;