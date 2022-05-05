import {Col, Card, ListGroup, ListGroupItem, Alert, Button, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { Component } from "react";
import { getAllVehicles } from "../services/carService";
import BookingService from "../services/BookingService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
import Pdf from "react-to-pdf";

class CarListUser extends Component{

    constructor(props) {
        super(props)

       
    this.state = { vehicle: [] };

    }


    componentDidMount() {
        this.getAllVehicles();
        
      }

    getAllVehicles = async () => {
        try {
          const vehi = await getAllVehicles();
          console.log(vehi.data);
          this.setState({ vehicle: vehi.data || [] });
        } catch (e) {
          console.log(e);
        }
      };

   


    
render() {
    return (
     //   this.state.vehicle.map((car) => {

     
        this.state.vehicle.map(car =>
            <Col lg={3} key={car._id} className="mb-3">
            <Card className="h-100">
            <Card.Img variant="top" />
            {/* <Card.Img variant="top" src={this.props.vehi.urlImg} /> */}
            <Card.Body>
                <Card.Title>{car.modelName} {car.manufactureYear}</Card.Title>
                
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><span className="fw-bold">Brand Name:</span> {car.brandName}</ListGroupItem>
                <ListGroupItem><span className="fw-bold">Price:</span> {car.price}</ListGroupItem>
                <ListGroupItem>
                
                         <Row>
                           <Col> <Button className="w-100" as={Link} to={`/booking/add/`}>Book-Now</Button></Col>
                           </Row>
                           {/*
                          <Col><Button as={Link} to={`/update/${car._id}`} variant="primary" className="w-100">Update</Button></Col> 
                         
                        <Col><Button variant="danger" className="w-100" onClick={()=> this.deleteVehicle(car._id) }>Delete</Button></Col>
                    </Row> */}
                    
                    
                </ListGroupItem>
            </ListGroup>
            </Card>
        </Col>
         )
     
            
    ) ;

}

};

 export default CarListUser;