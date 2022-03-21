import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';

function UpdateCar() {
    const { id } = useParams();
    const {cars, setCars}=useContext(MainContext);
    let CurrentCar = cars.filter((car) => car.id == id);
        CurrentCar=CurrentCar[0];
    const [modelName, setModelName] = useState(CurrentCar.modelName);
    const [brandName, setBrandName] = useState(CurrentCar.brandName);
    const [price, setPrice] = useState(CurrentCar.price);
    const [manufactureYear, setManufactureYear] = useState(CurrentCar.manufactureYear);
    const [urlImg, setUrlImg] = useState(CurrentCar.urlImg);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const history=useHistory();

    const validation = () => {
    
        if (!modelName || !brandName || !price || !manufactureYear || !urlImg) {
          return false;
        } else {
          return true;
        }
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setError(false);

        if(validation()===true){
            let filterCar = cars.filter((car) => car.id != id);
            const car = { modelName , brandName ,price,manufactureYear, urlImg, id: id };
            setCars([...filterCar, car]);

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
        <Row className="update">
        <h2>Update Car</h2>
        <Form onSubmit={handleSubmit} noValidate>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Model Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Model Name" value={modelName} onChange={(e) => setModelName(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Brand Name
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Brand Name" value={brandName} onChange={(e) => setBrandName(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Manu Facture Year
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Manu Facture Year" value={manufactureYear} onChange={(e) => setManufactureYear(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Price
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} noValidate/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                Url Img
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Url Img" value={urlImg} onChange={(e) => setUrlImg(e.target.value)} noValidate/>
                </Col>
            </Form.Group>

          <Button type="submit" disabled={isPending}>Update Car</Button>
        </Form>
        {error && <Alert variant={'danger'} className="fw-bold">You Should Fill All Input</Alert>}
        {success && <Alert variant={'success'} className="fw-bold">Success! Update Car</Alert>}
      </Row>
    )
}

export default UpdateCar
