import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://expense-tracker-api-qyti.onrender.com/api",
});

export default api;