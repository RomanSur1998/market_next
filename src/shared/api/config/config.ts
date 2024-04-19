import axios from "axios";

const API = "https://dummyjson.com/products";

export const axiosConfig = axios.create({
  baseURL: API,
});
