import { axiosConfig } from "../config/config";

export const api = {
  getProductList: async () => {
    try {
      const reponse = await axiosConfig.get("?limit=8");
      return reponse;
    } catch (error) {
      throw error;
    }
  },
};
