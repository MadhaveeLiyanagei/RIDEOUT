import axios from "axios";

const baseUrl = 'http://localhost:3000';

export const getAllBookings = () => {
    return axios.get(`/booking/`);
  };

  export const deleteBookingByID = (id) => {
      console.log(id)
    return axios.delete(baseUrl + `/booking/delete/${id}`)
  };


  export const getBookById = (booking_id) =>{
    return axios.get(baseUrl + `/booking/get/${booking_id}`);
  }

  export const addBooking = (booking) => {
    return axios.post(`/booking/add/`, booking);
  };

  export const updateBooking = (booking_id,booking) => {
    return axios.put(`/booking/update/${booking_id}`, booking);
  };


  
  