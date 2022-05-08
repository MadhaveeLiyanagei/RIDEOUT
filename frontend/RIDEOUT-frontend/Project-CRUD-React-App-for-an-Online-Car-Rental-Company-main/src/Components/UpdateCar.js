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

      onChangeImage = (e) => {
        if (e.target.type === "file") {
          const scope = this;
          let reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = function () {
            scope.setState({ image: reader.result });
          };
        } else {
          this.setState({ image: e.target.value });
        }
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

    console.log(this.state.modelName)

    if(this.state.modelName == ''){
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Model Name is Required !',  
         
        });  
       
      }
      else if (this.state.brandName == ''){


        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Brand Name is Required !',  
         
        });  
        
      }
      else if(this.state.manufactureYear == ''){


        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Manufacture Year is Required !',  
         
        });  
        
      }

      //console.log(this.state.price)
      else if(this.state.price == ''){
        console.log('here');

        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Price is Required !',  
         
        });  
        
      }
      else if(this.state.price < 0){
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
        const vehi = await updateVehicle(this.state.car_id,vehicle);
        console.log(vehi.status);
        toast('Successfully Updated!')
        this.props.history.push("/");
      } catch (e) {
        console.log(e);
      }

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
                        <Form.Control type="text" placeholder="Brand Name" value={this.state.brandName} onChange={this.onChanageVehicleBrandName} required noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Manufacture Year
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Manufacture Year" value={this.state.manufactureYear} onChange={this.onChanageVehicleManufactureYear} required noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Price
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Price" value={this.state.price} onChange={this.onChanageVehiclePrice} required noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Image
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="file"
                        id="validationImage"
                    placeholder="Required Image"
                    required
                    onChange={this.onChangeImage}/>
                        
                    </Col>
                    <div className="mb-3">
                    <img src={this.state.image} width="200px" alt="..."></img>
                  </div>
                </Form.Group>
    
              <Button type="submit">Update Car</Button>
            </Form>
        
          </Row>
        )
    }


}



export default UpdateCar
