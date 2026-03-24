import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response.message || "Something went wrong";

    return Promise.reject(new Error(message));
  },
);

export default http;
