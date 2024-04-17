import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla",
  headers: {
    "X-RapidAPI-Key": "2b0c49a57bmsh1dc2bdd6b172b1dp1b79c3jsn981a5b3a29c9",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  },
});
