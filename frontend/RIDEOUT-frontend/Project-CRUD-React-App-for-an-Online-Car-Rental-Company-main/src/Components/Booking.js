import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {Form, Row, Col, Button, Alert,Card} from 'react-bootstrap';
import axios from 'axios';


function Booking() {
    const {bookings, setBooking, CounBooking, setCounBooking}=useContext(MainContext);
    const [userName, setUserName] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalamount, setTotalAmount] = useState('');
    
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const history=useHistory();

    const validation = () => {
    
        if (!userName || !vehicleNo || !startDate || !endDate || !totalamount) {
          return false;
        } else {
          return true;
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setError(false);

        if(validation()===true){
         

            const booking = { userName , vehicleNo , startDate, endDate, totalamount};
            
            axios.post("http://localhost:3000/booking/add",booking).then((res) =>{
                if(res.data){
                    this.setState(
                        {
                            userName:"",
                            vehicleNo:"",
                            startDate:"",
                            endDate:"",
                            totalamount:"",
                        }
                    )
                }
            })

            setIsPending(true);
            setSuccess(true);

            setTimeout(() => {
                history.push("/payment");
            }, 1000);
            

        }else{
            setError(true);
        }
    }


    return (
        <Row className="booking">
        <h2>Add New Booking</h2>
        <Form onSubmit={handleSubmit} noValidate>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                <Card className="h-100"> <Card.Img variant="top" src="./imgs/banner.png" /> </Card>
                </Form.Label>
                <Form.Label column sm="2">
                User Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Vehicle Number
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Vehicle Number" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Start Date
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                End Date
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Total Price
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Total Price" value={totalamount} onChange={(e) => setTotalAmount(e.target.value)} noValidate/>
                </Col>
            </Form.Group>

          <Button type="submit" disabled={isPending}>Book Now</Button>
          
        </Form>
        {error && <Alert variant={'danger'} className="fw-bold">You Should Fill All Input</Alert>}
        {success && <Alert variant={'success'} className="fw-bold">Success! Create New Booking</Alert>}
        
      </Row>
    )
    
}

export default Booking
