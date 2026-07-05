import api from "../api/axios";

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getItems = async () => {
  const response = await api.get("/items", getHeaders());
  return response.data;
};

export const createItem = async (data: any) => {
  const response = await api.post("/items", data, getHeaders());
  return response.data;
};

export const updateItem = async (id: number, data: any) => {
  const response = await api.put(`/items/${id}`, data, getHeaders());
  return response.data;
};

export const deleteItem = async (id: number) => {
  const response = await api.delete(`/items/${id}`, getHeaders());
  return response.data;
};