import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';

function Driver() {
    const {drivers, setDriver}=useContext(MainContext);
    const [driver_id, setDriverId] = useState('');
    const [driver_name, setDriverName] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNIC] = useState('');
    const [phone_number, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const history=useHistory();


    const validation = () => {
    
        if (!driver_name || !email || !nic || !phone_number || !gender) {
          return false;
        } else {
          return true;
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setError(false);

        if(validation()===true){


            const driver = { driver_name , email, nic, phone_number, gender };
            
            axios.post("http://localhost:3000/driver/add",driver).then((res) =>{
                if(res.driver){
                    this.setState(
                        {
                          
                           driver_name:"",
                           email:"",
                           nic:"",
                           phone_number:"",
                           gender:""
                        }
                    )
                }
            })

            setIsPending(true);
            setSuccess(true);

            setTimeout(() => {
                history.push("/");
            }, 1000);
            

        }else{
            setError(true);
        }
    }
    return (
        <Row className="driver">
        <h2>Add New Driver</h2>
        <Form onSubmit={handleSubmit} noValidate>
            
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Driver Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder=" Name" value={driver_name} onChange={(e) => setDriverName(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                E-mail
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                NIC
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="NIC" value={nic} onChange={(e) => setNIC(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Phone Number
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Phone Number" value={phone_number} onChange={(e) => setPhone(e.target.value)} noValidate/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Gender
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} noValidate/>
                </Col>
            </Form.Group>

          <Button type="submit" disabled={isPending}>Add Driver</Button>
        </Form>
        {error && <Alert variant={'danger'} className="fw-bold">You Should Fill All Input</Alert>}
        {success && <Alert variant={'success'} className="fw-bold">Success! Create New Driver</Alert>}
      </Row>
    )
}

export default Driver
