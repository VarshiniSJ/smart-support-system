
import axios from "axios";

const api = axios.create({
  baseURL: "http://54.79.204.213",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
