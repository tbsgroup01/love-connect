import api from "./api.js";


export const createPaymentOrder = async (orderData) => {
  return await api.post("/payment/create-order", orderData);
};

export const verifyPayment = async (paymentData) => {
  return await api.post("/payment/verify-payment", paymentData);
};

export const getTransactions = async (params = {}) => {
  return await api.get("/payment/transactions", { params });
};

export const deleteTransaction = async (id) => {
  return await api.delete(`/payment/transactions/${id}`);
};
