import React,{Component, useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import {addSupplier} from '../services/supplierService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2"; 
toast.configure();

class AddSupplier extends Component{
   

    state = {
        
        supplier_name: "",
        email: "",
        nic: "",
        phone_number: "",
        gender: ""
      };

   
    onChangeSupplierName = (supplier_name) => {
        this.setState({
            supplier_name: supplier_name.target.value,
        });
      };
      onChangeSupplierEmail = (email) => {
        this.setState({
            email: email.target.value,
        });
      };
      onChangeSupplierNIC = (nic) => {
        this.setState({
            nic: nic.target.value,
        });
      };
      onChangeSupplierPhoneNumber = (phone_number) => {
        this.setState({
            phone_number: phone_number.target.value,
        });
      };

      onChangeSupplierGender = (gender) => {
        this.setState({
            gender: gender.target.value,
        });
      };

      onSubmit = async (v) => {

        console.log(this.state.supplier_name)

        if(this.state.supplier_name== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Supplier Name is Required !',  
           
          });  
          
        }
        if(this.state.email== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'E-mail is Required !',  
           
          });  
          
        }
        if(this.state.nic == ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'NIC is Required !',  
           
          });  
          
        }

        if(this.state.phone_number== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Phone Number is Required !',  
           
          });  
          
        }

        if(this.state.gender== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Gender is Required !',  
           
          });  
          
        }
        v.preventDefault();
        const supplier= {
            
            supplier_name: this.state.supplier_name,
            email: this.state.email,
            nic: this.state.nic,
            phone_number: this.state.phone_number,
            gender: this.state.gender,
        };
        try {
          const sup = await addSupplier(supplier);
          console.log(sup.status);
          toast('Supplier Added!')
          this.props.history.push("/");
        } catch (e) {
          console.log(e);
        }
      };
  

    render(){
        return(
            <Row className="create">
            <h2>Add New Supplier</h2>
            <Form onSubmit={this.onSubmit} noValidate>
             
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Supplier Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder=" Supplier Name" value={this.state.supplier_name} onChange={this.onChangeSupplierName} required noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    E-mail
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="E-mail" value={this.state.email} onChange={this.onChangeSupplierEmail} required noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    NIC
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="NIC" value={this.state.nic} onChange={this.onChangeSupplierNIC} required noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Phone Number
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Phone Number" value={this.state.phone_number} onChange={this.onChangeSupplierPhoneNumber} required noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                   Gender
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Gender" value={this.state.gender} onChange={this.onChangeSupplierGender} required noValidate/>
                    </Col>
                </Form.Group>
                {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Url Img
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Url Img" value={urlImg} onChange={(e) => setUrlImg(e.target.value)} noValidate/>
                    </Col>
                </Form.Group> */}
    
              <Button type="submit" >Add Supplier</Button>
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

export default AddSupplier
