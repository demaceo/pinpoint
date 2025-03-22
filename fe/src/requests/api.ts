import axios from "axios";
// Create a new instance of axios, setting the base URL to the API endpoint.
// Add an interceptor to the request that checks for a token in the local storage.
// If a token is found, add it to the request headers.
// If no token is found, log a message to the console.
const api = axios.create({
    baseURL: "http://localhost:5000/api",
});


api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error:", error);
        return Promise.reject(error);
    }
);

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.token = token;
    } else {
        console.log("No token found");
    }
    return config;
});

export default api;