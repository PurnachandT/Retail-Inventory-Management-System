import api from "../api/axios";

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getCustomers = async () => {
  const response = await api.get("/customers", getHeaders());
  return response.data;
};

export const createCustomer = async (data: any) => {
  const response = await api.post("/customers", data, getHeaders());
  return response.data;
};

export const updateCustomer = async (id: number, data: any) => {
  const response = await api.put(`/customers/${id}`, data, getHeaders());
  return response.data;
};

export const deleteCustomer = async (id: number) => {
  const response = await api.delete(`/customers/${id}`, getHeaders());
  return response.data;
};