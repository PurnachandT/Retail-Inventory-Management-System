import api from "../api/axios";

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createBill = async (data: any) => {
  const response = await api.post("/bills", data, getHeaders());
  return response.data;
};

export const getBills = async () => {
  const response = await api.get("/bills", getHeaders());
  return response.data;
};

export const getBillById = async (id: number) => {
  const response = await api.get(`/bills/${id}`, getHeaders());
  return response.data;
};

export const deleteBill = async (id: number) => {
    const response = await api.delete(
        `/bills/${id}`,
        getHeaders()
    );

    return response.data;
};