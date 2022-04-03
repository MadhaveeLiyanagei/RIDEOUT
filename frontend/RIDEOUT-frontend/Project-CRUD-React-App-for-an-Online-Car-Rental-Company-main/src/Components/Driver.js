import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';

function Driver() {
    const {drivers, setDriver, CounDriver, setCounDriver}=useContext(MainContext);
    const [id, setDriverId] = useState('');
    const [name, setDriverName] = useState('');
    const [license, setLicense] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [mobile, setMobile] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const history=useHistory();

    const validation = () => {
    
        if (!id || !name || !license || !email || !nic || !mobile) {
          return false;
        } else {
          return true;
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setError(false);

        if(validation()===true){
            let counDriver=CounDriver+1;
            setCounDriver(counDriver);

            const driver = { id , name , license, email, nic, mobile, id: counDriver };
            setDriver([...drivers, driver]);

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
                Driver ID
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Driver ID" value={id} onChange={(e) => setDriverId(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Driver Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder=" Name" value={name} onChange={(e) => setDriverName(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                License Number
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="License Number" value={license} onChange={(e) => setLicense(e.target.value)} noValidate/>
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
                    <Form.Control type="text" placeholder="NIC" value={nic} onChange={(e) => setNic(e.target.value)} noValidate/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Mobile
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} noValidate/>
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
