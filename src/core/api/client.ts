import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7093/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});