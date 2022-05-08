import axios from "axios";

const baseUrl = 'http://localhost:3000';

export const getAllPayments = () => {
    return axios.get(`/payment/`);
  };

  export const deletePaymentByID = (id) => {
      console.log(id)
    return axios.delete(baseUrl + `/payment/delete/${id}`)
  };


  export const getPaymentById = (payment_id) =>{
    return axios.get(baseUrl + `/payment/get/${payment_id}`);
  }

  export const addPayment = (payment) => {
    return axios.post(`/payment/add/`, payment);
  };

  export const updatePayment = (payment_id,payment) => {
    return axios.put(`/payment/update/${payment_id}`, payment);
  };


  
  