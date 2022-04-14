import axios from "axios";

const baseUrl = 'http://localhost:3000';

export const getAllDrivers = () => {
    return axios.get(`/driver/`);
  };

  export const deleteDriverByID = (id) => {
      console.log(id)
    return axios.delete(baseUrl + `/driver/delete/${id}`)
  };


  export const getDriverById = (driver_id) =>{
    return axios.get(baseUrl + `/driver/get/${driver_id}`);
  }

  export const addDriver = (driver) => {
    return axios.post(`/driver/add/`, driver);
  };

  export const updateDriver = (driver_id,driver) => {
    return axios.put(`/driver/update/${driver_id}`, driver);
  };


  
  