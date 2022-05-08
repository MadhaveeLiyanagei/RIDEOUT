import {Col, Card, ListGroup, ListGroupItem, Alert, Button, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { Component } from "react";
import { getAllVehicles,deleteVehicleByID } from "../services/carService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2"; 

toast.configure()

class CarList extends Component{

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

      deleteVehicle = async (id) => {
        Swal.fire(
          {  
          title: 'Are you sure?',  
          text: 'Vehicle will be deleted',  
          icon: 'warning',  
          showCancelButton: true,  
          confirmButtonColor: '#3085d6',  
          cancelButtonColor: '#d33',  
          confirmButtonText: 'Yes!'  
        }).then((result)=>{
          console.log(result)
          if(result.isConfirmed == true){
            try {
              const vehi =  deleteVehicleByID(id);
              this.getAllVehicles();    
              this.setState({
                vehicle: this.state.vehicle.filter((veh) => veh.id !== id),
              });
              toast('Successfully Deleted!')
    
            } catch (e) {
              console.log(e);
            }
          }else{
           
            Swal.fire({  
              icon: 'error',  
              title: 'Oops..',  
              text: 'Vehicle details are safe!',  
             
            }); 
          }
        });  

      };
render() {
  // <button className="btn btn-primary" onClick={()=> {this.props.history.replace('/generateVehicleReport')}}>  Generate Report</button>
 
    return (
     //   this.state.vehicle.map((car) => {
      // <Button className="w-100" width="50px" as={Link} to={'/generateVehicleReport'}>Generate Report</Button>
     
        this.state.vehicle.map(car =>
            <Col lg={3} key={car._id} className="mb-3" >
            <Card className="h-100">
            <Card.Img variant="top" />
           <Card.Img variant="top" src={car.image} /> 
            <Card.Body>
                <Card.Title>{car.modelName} {car.manufactureYear}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><span className="fw-bold">Brand Name:</span> {car.brandName}</ListGroupItem>
                <ListGroupItem><span className="fw-bold">Price per hour:</span> {car.price}</ListGroupItem>
                <ListGroupItem>
                    <Row>
                         {/* <Row>
                           <Col> <Button className="w-100" width="50px" as={Link} to={`/booking/add/`}>Book-Now</Button></Col>
                           </Row> */}
                           <Row><Col></Col></Row>
                          <Col><Button as={Link} to={`/update/${car._id}`} variant="primary" className="w-100">Update</Button></Col> 
                         
                        <Col><Button variant="danger" className="w-100" onClick={()=> this.deleteVehicle(car._id) }>Delete</Button></Col>
                    </Row>                    
                </ListGroupItem>
            </ListGroup>
            </Card> 
        </Col>  
         )           
    ) ;
}



};

 export default CarList;