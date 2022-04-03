import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';

function Payment() {
    const {payments, setPayment, CounPayment, setCounPayment}=useContext(MainContext);
    const [paymentId, setPaymentId] = useState('');
    const [userName, setUserName] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [paidtDate, setPaidtDate] = useState('');
    const [total, setTotal] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const history=useHistory();

    const validation = () => {
    
        if (!paymentId || !userName || !vehicleNo || !paidtDate || !total) {
          return false;
        } else {
          return true;
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setError(false);

        if(validation()===true){
            let counPayment=CounPayment+1;
            setCounPayment(counPayment);

            const payment = { paymentId , userName , vehicleNo, paidtDate, total, id: counPayment };
            setPayment([...payments, payment]);

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
        <Row className="payment">
        <h2>Add New Payment</h2>
        <Form onSubmit={handleSubmit} noValidate>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                payemnt ID
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="payemnt ID" value={paymentId} onChange={(e) => setPaymentId(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
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
                Paid Date
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Paid Date" value={paidtDate} onChange={(e) => setPaidtDate(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Total Paid
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Total Paid" value={total} onChange={(e) => setTotal(e.target.value)} noValidate/>
                </Col>
            </Form.Group>

          <Button type="submit" disabled={isPending}>Add Payment</Button>
        </Form>
        {error && <Alert variant={'danger'} className="fw-bold">You Should Fill All Input</Alert>}
        {success && <Alert variant={'success'} className="fw-bold">Success! Create New Payment</Alert>}
      </Row>
    )
}

export default Payment
