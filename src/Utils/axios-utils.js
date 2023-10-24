import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:3000' //  our api base url
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