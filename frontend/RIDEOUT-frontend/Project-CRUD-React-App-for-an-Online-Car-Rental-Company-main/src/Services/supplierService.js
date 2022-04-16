import axios from "axios";

const baseUrl = 'http://localhost:3000';

export const getAllSuppliers = () => {
    return axios.get(`/supplier/`);
  };

  export const deleteSupplierByID = (id) => {
      console.log(id)
    return axios.delete(baseUrl + `/supplier/delete/${id}`)
  };


  export const getSupplierById = (supplier_id) =>{
    return axios.get(baseUrl + `/supplier/get/${supplier_id}`);
  }

  export const addSupplier = (supplier) => {
    return axios.post(`/supplier/add/`, supplier);
  };

  export const updateSupplier = (supplier_id,supplier) => {
    return axios.put(`/supplier/update/${supplier_id}`, supplier);
  };


  
  