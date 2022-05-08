import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import  { Component } from "react";
import { getBookingById,updateBooking } from "../services/BookingService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

import Swal from "sweetalert2";


class UpdateBooking extends Component{

    constructor(props) {
        super(props)

        this.state = {
            booking_id: this.props.match.params.booking_id,
            username: "",
            startDate: "",
            endDate: "",
            totalamount: "",
            
        }
       
    }

    componentDidMount() {
        this.getBooking();
      }


  
    onChangeUserName = (username) => {
        this.setState({
            username: username.target.value,
        });
      };
      onChangeVehicleNo = (vehicleNo) => {
        this.setState({
            vehicleNo: vehicleNo.target.value,
        });
      };
      onChangeStartDate= (startDate) => {
        this.setState({
            startDate: startDate.target.value,
        });
      };

      onChangeEndDate = (endDate) => {
        this.setState({
            endDate: endDate.target.value,
        });
      };

      onChangeTotalamount = (endDate) => {
        this.setState({
            endDate: endDate.target.value,
        });
      };

      getBooking = async () =>{

        console.log(this.props.match.params.id)

        try{
             getBookingById(this.props.match.params.id).then((res)=>{
            
                let booking = res.data.post;
                 this.setState({booking_id: booking._id,
                    userName: booking.userName,
                    vehicleNo : booking.vehicleNo,
                    startDate:booking.startDate,
                    endDate:booking.endDate,
                    totalamount:booking.totalamount
                 });
            })
       
  
        }catch(e){
            console.log(e);
        }
   }

//    onSubmit = async(v)=>{
//     v.preventDefault();
//     const driver = {
        
//         driver_name: this.state.driver_name,
//         email: this.state.email,
//         nic: this.state.nic,
//         phone_number: this.state.phone_number,
//         gender: this.state.gender
//     };
//     try {
//         const sup = await updateDriver(this.state.driver_id,driver);
//         console.log(sup.status);
//         toast('Successfully Updated!')
//         this.props.history.push("/driverdetail");
//       } catch (e) {
//         console.log(e);
//       }

//    }





   onSubmit = async (v) => {

    console.log(this.state.username)

    if(this.state.username == ''){
      console.log('here');

      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'User Name is Required !',  
       
      });  
      
    }
    else if(this.state.vehicleNo == ''){
      console.log('here');

      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Vehicle No is Required !',  
       
      });  
      
    }
    else if(this.state.startDate == ''){
      console.log('here');

      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Start Date is Required !',  
       
      });  
      
    }

    else if(this.state.endDate == ''){
        console.log('here');

        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: ' End Date is Required !',  
         
        });  
        
      }
      else if(this.state.totalamount == ''){
        console.log('here');

        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Total Amount is Required !',  
         
        });  
        
      }
  

      v.preventDefault();

      const booking = {
        
        username: this.state.username,
        vehicleNo: this.state.vehicleNo,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        totalamount: this.state.totalamount,
    };
    try {
      const book = await updateBooking(this.state.booking_id,booking);
      console.log(book.status);
      toast('Successfully Updated!')
      this.props.history.push("/bookingdetail");
    } catch (e) {
      console.log(e);
    }

 }


    //     validation = async() => {
    
    //     if (!modelName || !brandName || !price || !manufactureYear || !urlImg) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   };

    // }

    render() {
        return(
            <Row className="update">
            <h2>Update Booking</h2>
            <Form onSubmit={this.onSubmit} noValidate>
               
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    User Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder=" User Name" value={this.state.username} onChange={this.onChangeUserName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Vehicle No
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="vehicleNo" placeholder="Vehicle No" value={this.state.vehicleNo} onChange={this.onChangeVehicleNo} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Start Date
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="startDate" value={this.state.startDate} onChange={this.onChangeStartDate} noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    End Date
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="End Date" value={this.state.endDate} onChange={this.onChangeEndDate} noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Total Amount
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder=" totalamount" value={this.state.totalamount} onChange={this.onChangeTotalamount} noValidate/>
                    </Col>
                </Form.Group>

            
              

    
              <Button type="submit" >Update Booking</Button>
            </Form>
          </Row>
        )
    }


}



export default UpdateBooking
