import React,{Component, useContext,useState} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useHistory } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import {addVehicle} from '../services/carService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2"; 
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
toast.configure();

class NewCar extends Component{

    state = {
       
        modelName: "",
        brandName: "",
        manufactureYear: "",
        price: "",
        image: "",
        error: false, 
        errorMessage: {}

      };

   

    onChanageVehicleModelName = (modelName) => {

      console.log(this.state.modelName)

      this.setState({

        modelName: modelName.target.value,
      
    });

      };
      onChanageVehicleBrandName = (brandName) => {
        this.setState({
            brandName: brandName.target.value,
        });
      };
      onChanageVehicleManufactureYear = (manufactureYear) => {
        this.setState({
            manufactureYear: manufactureYear.target.value,
        });
      };
      onChanageVehiclePrice = (price) => {
        this.setState({
            price: price.target.value,
        });
      };

      getImageFileObject(imageFile) {
        console.log(imageFile);
    
        this.state.image = imageFile.dataUrl;
      }
    
      runAfterImageDelete(file) {
        console.log({ file });
      }

      onSubmit = async (v) => {

        console.log(this.state.modelName)

        if(this.state.modelName === ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Model Name is Required !',  
           
          });  
          
        }
        if(this.state.brandName === ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Brand Name is Required !',  
           
          });  
          
        }
        if(this.state.manufactureYear === ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Manufacture Year is Required !',  
           
          });  
          
        }

        console.log(this.state.price)
        if(this.state.price === ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Price is Required !',  
           
          });  
          
        }
        if(this.state.price < 0){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Please Enter Valid Amount !',  
           
          });  
          
        }
      
      
          v.preventDefault();

          const vehicle = {
            
            modelName: this.state.modelName,
            brandName: this.state.brandName,
            manufactureYear: this.state.manufactureYear,
            price: this.state.price,
            image: this.state.image,
        };
        try {
          const vehi = await addVehicle(vehicle);
          console.log(vehi.status);
          toast('Car Added!')
          this.props.history.push("/");
        } catch (e) {
          console.log(e);
        }
      
      
      };

    render(){
        return(
            <Row className="create">
            <h2>Add New Car</h2>
            

            <Form onSubmit={this.onSubmit} noValidate>
            
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                    Model Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Model Name" value={this.state.modelName} onChange={this.onChanageVehicleModelName} required  />
                        {/* <Form.Control.Feedback type='invalid'>
        {useState.errors.name }
    </Form.Control.Feedback> */}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Brand Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Brand Name" value={this.state.brandName} onChange={this.onChanageVehicleBrandName} required noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Manufacture Year
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" placeholder="Manufacture Year" value={this.state.manufactureYear} onChange={this.onChanageVehicleManufactureYear} required noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Price
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" placeholder="Price" value={this.state.price} onChange={this.onChanageVehiclePrice} required noValidate/>
                        
                    </Col>
                </Form.Group>
                 <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Image
                    </Form.Label>
                    <Col sm="10">
                    <ImageUploader
                onFileAdded={(img) => this.getImageFileObject(img)}
                onFileRemoved={(img) => this.runAfterImageDelete(img)}
                style={{
                  height: 200,
                  width: 200,
                  background: "rgb(0 182 255)",
                }}
                deleteIcon={
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png"
                    alt=""
                  />
                }
                uploadIcon={
                  <svg
                    className="svg-circleplus"
                    viewBox="0 0 100 100"
                    style={{ height: "40px", stroke: "#000" }}
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      strokeWidth="7.5"
                    ></circle>
                    <line
                      x1="32.5"
                      y1="50"
                      x2="67.5"
                      y2="50"
                      strokeWidth="5"
                    ></line>
                    <line
                      x1="50"
                      y1="32.5"
                      x2="50"
                      y2="67.5"
                      strokeWidth="5"
                    ></line>
                  </svg>
                }
              />
                    </Col>
                </Form.Group> 
    
              <Button type="submit" >Add Car</Button>
            </Form>
          </Row>
        )
    }

}


export default NewCar
