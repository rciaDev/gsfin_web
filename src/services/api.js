import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({    
    baseURL:process.env.NEXT_PUBLIC_URL_API,    
    timeout:60000,
    headers:{
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json*'
    }     
});

api.interceptors.request.use(async config => {
    const { '@gsfin-token':token } = parseCookies();

    if(token)
        config.headers.Authorization = 'Bearer ' + token;

    return config;
});

export default api;