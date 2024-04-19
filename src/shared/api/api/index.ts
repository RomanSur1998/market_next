import { axiosConfig } from "../config/config";

export const api = {
  getProductList: async () => {
    try {
      const reponse = await axiosConfig.get("?limit=8");
      return reponse.data;
    } catch (error) {
      throw error;
    }
  },
  getCategory: async () => {
    const reponse = await axiosConfig.get("/categories");
    return reponse.data;
  },
};
