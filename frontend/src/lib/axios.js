import axios from "axios";

const BASE_URL = "http://localhost:5001/api";

export const api = axios.create({
    baseURL: BASE_URL
})