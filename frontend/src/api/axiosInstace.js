import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080", // from .env
});

// Attach token to every request
instance.interceptors.request.use(
  (config) => {
    // console.log(config);

    if(!config.auth){
        console.log("Getting token from localStorage");
        const token = localStorage.getItem("token");
        if (token) {
        console.log("Token found, attaching to request");
        config.headers.Authorization = `Bearer ${token}`;
    }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
