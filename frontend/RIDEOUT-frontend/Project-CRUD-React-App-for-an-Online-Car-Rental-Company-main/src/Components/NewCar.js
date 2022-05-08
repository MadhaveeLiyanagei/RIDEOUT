import React,{Component, useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import {addVehicle} from '../services/carService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class NewCar extends Component{
   

    state = {
        modelName: "",
        brandName: "",
        manufactureYear: "",
        price: "",
      };

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

      onSubmit = async (v) => {
        v.preventDefault();
        const vehicle = {
            modelName: this.state.modelName,
            brandName: this.state.brandName,
            manufactureYear: this.state.manufactureYear,
            price: this.state.price,
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
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Model Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Model Name" value={this.state.modelName} onChange={this.onChanageVehicleModelName} noValidate/>
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
                {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Url Img
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Url Img" value={urlImg} onChange={(e) => setUrlImg(e.target.value)} noValidate/>
                    </Col>
                </Form.Group> */}
    
              <Button type="submit" >Add Car</Button>
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

export default NewCar
