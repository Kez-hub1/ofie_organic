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

export const makePayment = async (paymentData) => {
  console.log('Making payment with data:', paymentData);
  
  try {
    const response = await apiClient.post(
      '/api/payment/checkout',
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('Payment response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Payment error:', error);
    console.error('Payment error response:', error.response?.data);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (cartItemId, quantity) => {
  const response = await apiClient.put(
    `/api/cart/update/${cartItemId}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }
  );
  return response.data;
};

// Delete single cart item
export const deleteCartItem = async (productId) => {
  try {
    const response = await apiClient.delete(
      '/api/cart/remove',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          'Content-Type': 'application/json',
        },
        data: {
          productId: productId
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Delete cart item error:', error);
    throw error;
  }
};

// Clear entire cart
export const clearCart = async () => {
  try {
    const response = await apiClient.delete(
      `/api/cart/clear`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Clear cart error:', error);
    throw error;
  }
};