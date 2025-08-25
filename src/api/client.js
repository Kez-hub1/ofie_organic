import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://keziah-api.onrender.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const apifetcher = async (url) => {
  const response = await apiClient.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    },
  });
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await apiClient.post('/api/cart/add', {
    productId,
    quantity
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    },
  });
  
  return response.data;
};

export async function fetchProducts(token) {
  const response = await apiClient.get('/api/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchSingleProduct(id, token) {
  const response = await apiClient.get(`/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;