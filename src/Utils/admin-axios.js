import axios  from "axios";

const trainerApi = axios.create({
    baseURL: 'http://localhost:3000' //  our api base url
})

trainerApi.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('adminToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)


export default trainerApi;