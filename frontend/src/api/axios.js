import axios from "axios";

const api = axios.create({
  baseURL: "https://snippethub-backend-1j3q.onrender.com/api",
});

export default api;