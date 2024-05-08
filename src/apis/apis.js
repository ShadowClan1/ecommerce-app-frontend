import axios from "axios";

const instance = axios.create({
  baseURL: `${
    import.meta.env.VITE_APP_BACKEND_URL ?? "http://localhost:3000/api"
  }`,
});

export default instance;

export const applyDiscountCopoun = async () => {
  try {
    const data = await instance.post(`/apply-copoun`, data);
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchProducts = async () => {
  try {
    const data = await instance.get(`/list-products`);
    return data;
  } catch (error) {
    return [];
  }
};
