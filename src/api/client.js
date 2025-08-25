import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const apifetcher = async (url) => {
  const response = await apiClient.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    },
  });
  return response.data;
};

export async function fetchProducts(token) {
  const response = await fetch('https://keziah-api.onrender.com/api/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};
export async function fetchSingleProduct(id, token) {
  const response = await fetch(`https://keziah-api.onrender.com/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

export const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
