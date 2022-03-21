import {Col, Card, ListGroup, ListGroupItem, Alert, Button, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const CarList = ({cars, handleDelete}) => {
    console.log(cars);
    return(
        
        <>
            {cars.length != 0 ? cars.map((car)=>(
                <Col lg={3} key={car.id} className="mb-3">
                    <Card className="h-100">
                    <Card.Img variant="top" src={car.urlImg} />
                    <Card.Body>
                        <Card.Title>{car.modelName} {car.manufactureYear}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><span className="fw-bold">Brand Name:</span> {car.brandName}</ListGroupItem>
                        <ListGroupItem><span className="fw-bold">Price:</span> {car.price}</ListGroupItem>
                        <ListGroupItem>
                            <Row>
                            
                               
                                <Col><Button as={Link} to={`/update/${car.id}`} variant="primary" className="w-100">Update</Button></Col>
                                <Col><Button variant="danger" className="w-100" onClick={()=> handleDelete(car.id) }>Delete</Button></Col>
                            </Row>
                            
                            
                        </ListGroupItem>
                    </ListGroup>
                    </Card>
                </Col>
            )):(
                <Alert variant={'danger'}>
                    No Item
                </Alert>
            )
            }
        </>

    )
}
export default CarList;