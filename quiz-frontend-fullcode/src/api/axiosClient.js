
// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:8080/api",
// });

// export default axiosClient;


// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

// optional safety: always pick latest token from localStorage
axiosClient.interceptors.request.use((config) => {
  const stored = localStorage.getItem("quizUser");
  if (stored) {
    const user = JSON.parse(stored);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export default axiosClient;
