import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import CarList from './CarList';
import {Row} from 'react-bootstrap';
function Home() {
    const {cars, setCars}=useContext(MainContext);

    const handleDelete =(id)=>{
        const newCar=cars.filter((car)=>(car.id !== id));
        setCars(newCar);        
    }

    return (
        <Row>
            <CarList cars={cars} handleDelete={handleDelete}/>
        </Row>
    )
}

export default Home
