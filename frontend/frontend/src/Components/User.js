import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';

function User() {
    const {users, setUser, CounUser, setCounUser}=useContext(MainContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [nic, setNic] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const history=useHistory();

    const validation = () => {
    
        if (!firstName || !lastName || !email || !mobile || !nic) {
          return false;
        } else {
          return true;
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setError(false);

        if(validation()===true){
            let counUser=CounUser+1;
            setCounUser(counUser);

            const user = { firstName , lastName , email, mobile, nic, id: counUser };
            setUser([...users, user]);

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
        <Row className="user">
        <h2>Add New User</h2>
        <Form onSubmit={handleSubmit} noValidate>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                First Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Last Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} noValidate/>
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
                Contact Number
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Contact Number" value={mobile} onChange={(e) => setMobile(e.target.value)} noValidate/>
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

          <Button type="submit" disabled={isPending}>Add User</Button>
        </Form>
        {error && <Alert variant={'danger'} className="fw-bold">You Should Fill All Input</Alert>}
        {success && <Alert variant={'success'} className="fw-bold">Success! Create New User</Alert>}
      </Row>
    )
}

export default User
