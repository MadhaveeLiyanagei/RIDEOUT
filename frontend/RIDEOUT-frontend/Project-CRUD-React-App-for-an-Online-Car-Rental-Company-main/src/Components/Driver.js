import React,{Component, useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import {addDriver} from '../services/DriverService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
import Swal from "sweetalert2";

class Driver extends Component{
   

    state = {
        driver_name: "",
        email: "",
        nic: "",
        phone_number: "",
        gender: "",
      };

    onChanagDriverName = (driver_name) => {
        this.setState({
            driver_name: driver_name.target.value,
        });
      };
      onChanageDriverEmail = (email) => {
        this.setState({
            email: email.target.value,
        });
      };
      onChanageDriverNIC = (nic) => {
        this.setState({
            nic: nic.target.value,
        });
      };

      onChanageDriverPhone = (phone_number) => {
        this.setState({
            phone_number: phone_number.target.value,
        });
      };
      onChanageDriverGender = (gender) => {
        this.setState({
            gender: gender.target.value,
        });
      };

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
          const drive = await addDriver(driver);
          console.log(drive.status);
          toast('Driver Added!')
          this.props.history.push("/");
        } catch (e) {
          console.log(e);
        }
      };

    render(){
        return(
            <Row className="create">
            <h2>Add New Driver</h2>
            <Form onSubmit={this.onSubmit} noValidate>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Driver Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Driver Name" value={this.state.driver_name} onChange={this.onChanagDriverName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Email 
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" placeholder="E-mail" value={this.state.email} onChange={this.onChanageDriverEmail} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                   NIC
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="NIC" value={this.state.nic} onChange={this.onChanageDriverNIC} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Mobile
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Mobile" value={this.state.phone_number} onChange={this.onChanageDriverPhone} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Gender
                    </Form.Label>
                    <Col sm="10">
                    <Form.Label column sm="2">    <input type="radio" value="Male" name="gender" onChange={this.onChanageDriverGender} noValidate/> Male
                    </Form.Label>  <Form.Label column sm="2">  <input type="radio" value="Female" name="gender" onChange={this.onChanageDriverGender} noValidate/> Female
                    </Form.Label>  <Form.Label column sm="2"> <input type="radio" value="Other" name="gender" onChange={this.onChanageDriverGender} noValidate/> Other
                    </Form.Label></Col>
                </Form.Group>
                {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Url Img
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Url Img" value={urlImg} onChange={(e) => setUrlImg(e.target.value)} noValidate/>
                    </Col>
                </Form.Group> */}
    
              <Button type="submit" >Add Driver</Button>
            </Form>
          </Row>
        )
    }

}

// function NewCar() {


//     const validation = () => {
    
//         if (!modelName || !brandName || !price || !manufactureYear || !urlImg) {
//           return false;
//         } else {
//           return true;
//         }
//       };

// }

export default Driver
