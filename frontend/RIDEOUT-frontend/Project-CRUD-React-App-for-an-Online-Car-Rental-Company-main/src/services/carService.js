import axios from "axios";
const baseUrl = 'http://localhost:3000';

export const getAllVehicles = () => {
    return axios.get(`/vehicle/`);
  };

  export const deleteVehicleByID = (id) => {
      console.log(id)
    return axios.delete(baseUrl + `/vehicle/delete/${id}`)
  };

  export const getCarById = (car_id) =>{
    return axios.get(baseUrl + `/vehicle/get/${car_id}`);
  }

  export const addVehicle = (vehicle) => {
    return axios.post(`/vehicle/add/`, vehicle);
  };

  export const updateVehicle = (car_id,vehicle) => {
    return axios.put(`/vehicle/update/${car_id}`, vehicle);
  };
  
  