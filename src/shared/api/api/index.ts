import { model } from "@/shared/effector/products-list/models";
import { axiosConfig } from "../config/config";

export const api = {
  getProductList: async (limit: number) => {
    try {
      const reponse = await axiosConfig.get(`?limit=${limit}`);
      return reponse.data;
    } catch (error) {
      throw error;
    }
  },
  getCategory: async () => {
    const reponse = await axiosConfig.get("/categories");
    return reponse.data;
  },
  getOneCategoryProducts: async (category: string) => {
    const response = await axiosConfig.get(`/category/${category}`);
    return response.data;
  },
  searchProducts: async (params: string) => {
    const reponse = await axiosConfig.get(`/search?q=${params}`);
    return reponse.data;
  },
};
