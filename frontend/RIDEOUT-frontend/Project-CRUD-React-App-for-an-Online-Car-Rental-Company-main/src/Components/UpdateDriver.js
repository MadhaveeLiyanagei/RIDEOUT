import Swal from "sweetalert2";



import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import  { Component } from "react";
import { getDriverById,updateDriver } from "../services/DriverService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();





class UpdateDriver extends Component{

    constructor(props) {
        super(props)

        this.state = {
            driver_id: this.props.match.params.driver_id,
            driver_name: "",
            email: "",
            nic: "",
            phone_number: "",
            gender: ""
        }
       
    }

    componentDidMount() {
        this.getDriver();
      }


  
    onChangeDriverName = (driver_name) => {
        this.setState({
            driver_name: driver_name.target.value,
        });
      };
      onChangeDriverEmail = (email) => {
        this.setState({
            email: email.target.value,
        });
      };
      onChangeDriverNIC = (nic) => {
        this.setState({
            nic: nic.target.value,
        });
      };
      onChangeDriverPhoneNumber = (phone_number) => {
        this.setState({
            phone_number: phone_number.target.value,
        });
      };

      onChangeDriverGender = (gender) => {
        this.setState({
            gender: gender.target.value,
        });
      };


      getDriver = async () =>{

        console.log(this.props.match.params.id)

        try{
             getDriverById(this.props.match.params.id).then((res)=>{
            
                let driver = res.data.post;
                 this.setState({driver_id: driver._id,
                    driver_name: driver.driver_name,
                    email : driver.email,
                    nic:driver.nic,
                    phone_number:driver.phone_number,
                    gender:driver.gender
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

    console.log(this.state.driver_name)

    if(this.state.driver_name == ''){
      console.log('here');

      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Driver Name is Required !',  
       
      });  
      
    }
    else if(this.state.email == ''){
      console.log('here');

      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'E-mail is Required !',  
       
      });  
      
    }
    else if(this.state.nic == ''){
      console.log('here');

      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'NIC is Required !',  
       
      });  
      
    }

    else if(this.state.phone_number == ''){
        console.log('here');

        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Phone Number is Required !',  
         
        });  
        
      }
      else if(this.state.gender == ''){
        console.log('here');

        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Gender is Required !',  
         
        });  
        
      }
  

      v.preventDefault();

      const driver = {
        
        driver_name: this.state.driver_name,
        email: this.state.email,
        nic: this.state.nic,
        phone_number: this.state.phone_number,
        gender: this.state.gender,
    };
    try {
      const drive = await updateDriver(this.state.driver_id,driver);
      console.log(drive.status);
      toast('Successfully Updated!')
      this.props.history.push("/driverdetail");
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
            <h2>Update Driver</h2>
            <Form onSubmit={this.onSubmit} noValidate>
               
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Driver Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder=" Driver Name" value={this.state.driver_name} onChange={this.onChangeDriverName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    E-mail
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" placeholder="E-mail" value={this.state.email} onChange={this.onChangeDriverEmail} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    NIC
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="NIC" value={this.state.nic} onChange={this.onChangeDriverNIC} noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Phone Number
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Phone Number" value={this.state.phone_number} onChange={this.onChangeDriverPhoneNumber} noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Gender
                    </Form.Label>
                    <Col sm="10">
                    <Form.Label column sm="2">    <input type="radio" value="Male" name="gender" onChange={this.onChangeDriverGender} noValidate/> Male
                    </Form.Label>  <Form.Label column sm="2">  <input type="radio" value="Female" name="gender" onChange={this.onChangeDriverGender} noValidate/> Female
                    </Form.Label>  <Form.Label column sm="2"> <input type="radio" value="Other" name="gender" onChange={this.onChangeDriverGender} noValidate/> Other
                    </Form.Label></Col>
                </Form.Group>
              

    
              <Button type="submit" >Update Driver</Button>
            </Form>
          </Row>
        )
    }


}



export default UpdateDriver
