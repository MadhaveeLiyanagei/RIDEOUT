import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import  { Component } from "react";
import { getCarById,updateVehicle } from "../services/carService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import Swal from "sweetalert2"; 
toast.configure();


class UpdateCar extends Component{

    constructor(props) {
        super(props)

        this.state = {
            car_id: this.props.match.params.car_id,
            modelName:"",
            brandName:"",
            manufactureYear:"",
            price:"",
            image:"",
            error: false, 
            errorMessage: {}
        }
       
    }

    onChanageVehicleModelName = (modelName) => {
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

    componentDidMount() {
        this.getCar();
      }

    getCar = async () =>{

        console.log(this.props.match.params.id)

        try{
             getCarById(this.props.match.params.id).then((res)=>{
            
                let car = res.data.post;
                 this.setState({car_id: car._id,
                     modelName: car.modelName,
                     brandName : car.brandName,
                     manufactureYear:car.manufactureYear,
                     price:car.price,
                     image:car.image
                 });
            })
       
  
        }catch(e){
            console.log(e);
        }
   }

   onSubmit = async(v)=>{

    // console.log(this.state.modelName)

    // if(this.state.modelName == ''){
    //     Swal.fire({  
    //       icon: 'error',  
    //       title: 'Oops...',  
    //       text: 'Model Name is Required !',  
         
    //     });  
       
    //   }
    //   if(this.state.brandName == ''){


    //     Swal.fire({  
    //       icon: 'error',  
    //       title: 'Oops...',  
    //       text: 'Brand Name is Required !',  
         
    //     });  
        
    //   }
    //   if(this.state.manufactureYear == ''){


    //     Swal.fire({  
    //       icon: 'error',  
    //       title: 'Oops...',  
    //       text: 'Manufacture Year is Required !',  
         
    //     });  
        
    //   }

    //   console.log(this.state.price)
    //   if(this.state.price == ''){
    //     console.log('here');

    //     Swal.fire({  
    //       icon: 'error',  
    //       title: 'Oops...',  
    //       text: 'Price is Required !',  
         
    //     });  
        
    //   }
    //   if(this.state.price < 0){
    //     console.log('here');

    //     Swal.fire({  
    //       icon: 'error',  
    //       title: 'Oops...',  
    //       text: 'Please Enter Valid Amount !',  
         
    //     });  
        
    //   }
    v.preventDefault();
    const vehicle = {
        modelName: this.state.modelName,
        brandName: this.state.brandName,
        manufactureYear: this.state.manufactureYear,
        price: this.state.price,
        image: this.state.image,
    };
    try {
        const vehi = await updateVehicle(this.state.car_id,vehicle);
        console.log(vehi.status);
        toast('Successfully Updated!')
        this.props.history.push("/");
      } catch (e) {
        console.log(e);
      }

   }

   getImageFileObject(imageFile) {
    console.log(imageFile.dataUrl);

    this.state.image = imageFile.dataUrl;
  }

  runAfterImageDelete(file) {
    console.log({ file });
  }


    render() {
        return(
            <Row className="update">
            <h2>Update Car</h2>
            <Form onSubmit={this.onSubmit} noValidate>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Model Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Model Name" value={this.state.modelName} onChange={this.onChanageVehicleModelName} required/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Brand Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Brand Name" value={this.state.brandName} onChange={this.onChanageVehicleBrandName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Manufacture Year
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Manufacture Year" value={this.state.manufactureYear} onChange={this.onChanageVehicleManufactureYear} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Price
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Price" value={this.state.price} onChange={this.onChanageVehiclePrice} noValidate/>
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
                  <img
                    src={this.state.image}
                    alt=""
                    style={{ height: 150, width: 150 }}
                  />
                }

                // uploadIcon={
                //   <svg
                //     className="svg-circleplus"
                //     viewBox="0 0 100 100"
                //     style={{ height: "40px", stroke: "#000" }}
                //     value={this.state.image}
                //   >
                //     <circle
                //       cx="50"
                //       cy="50"
                //       r="45"
                //       fill="none"
                //       strokeWidth="7.5"
                //     ></circle>
                //     <line
                //       x1="32.5"
                //       y1="50"
                //       x2="67.5"
                //       y2="50"
                //       strokeWidth="5"
                //     ></line>
                //     <line
                //       x1="50"
                //       y1="32.5"
                //       x2="50"
                //       y2="67.5"
                //       strokeWidth="5"
                //     ></line>
                //   </svg>
                // }
              />
                    </Col>
                </Form.Group> 
    
              <Button type="submit">Update Car</Button>
            </Form>
        
          </Row>
        )
    }


}



export default UpdateCar
