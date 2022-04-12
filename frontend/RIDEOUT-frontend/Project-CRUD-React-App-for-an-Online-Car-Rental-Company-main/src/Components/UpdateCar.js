import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import  { Component } from "react";
import { getCarById,updateVehicle } from "../services/carService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


class UpdateCar extends Component{

    constructor(props) {
        super(props)

        this.state = {
            car_id: this.props.match.params.driver_id,
           
            modelName:"",
            brandName:"",
            manufactureYear:"",
            price:"",
        }
       
    }

    onChanageVehicleModelName = (modelName) => {
        this.setState({
            modelName: modelName.target.value,
        });
      };
      onChanageVehicleBrandName = (brandName) => {
        this.setState({
            brandName: brandName.target.value,
        });
      };
      onChanageVehicleManufactureYear = (manufactureYear) => {
        this.setState({
            manufactureYear: manufactureYear.target.value,
        });
      };
      onChanageVehiclePrice = (price) => {
        this.setState({
            price: price.target.value,
        });
      };

    componentDidMount() {
        this.getCar();
      }

    getCar = async () =>{

        console.log(this.props.match.params.id)

        try{
             getCarById(this.props.match.params.id).then((res)=>{
            
                let car = res.data.post;
                 this.setState({car_id: car._id,
                     modelName: car.modelName,
                     brandName : car.brandName,
                     manufactureYear:car.manufactureYear,
                     price:car.price
                 });
            })
       
  
        }catch(e){
            console.log(e);
        }
   }

   onSubmit = async(v)=>{
    v.preventDefault();
    const vehicle = {
        modelName: this.state.modelName,
        brandName: this.state.brandName,
        manufactureYear: this.state.manufactureYear,
        price: this.state.price,
    };
    try {
        const vehi = await updateVehicle(this.state.car_id,vehicle);
        console.log(vehi.status);
        toast('Successfully Updated!')
        this.props.history.push("/");
      } catch (e) {
        console.log(e);
      }

   }

    //     validation = async() => {
    
    //     if (!modelName || !brandName || !price || !manufactureYear || !urlImg) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   };

    // }

    render() {
        return(
            <Row className="update">
            <h2>Update Car</h2>
            <Form onSubmit={this.onSubmit} noValidate>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Model Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Model Name" value={this.state.modelName} onChange={this.onChanageVehicleModelName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Brand Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Brand Name" value={this.state.brandName} onChange={this.onChanageVehicleBrandName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Manufacture Year
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Manufacture Year" value={this.state.manufactureYear} onChange={this.onChanageVehicleManufactureYear} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Price
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Price" value={this.state.price} onChange={this.onChanageVehiclePrice} noValidate/>
                    </Col>
                </Form.Group>
                {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Url Img
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Url Img" value={urlImg} onChange={(e) => setUrlImg(e.target.value)} noValidate/>
                    </Col>
                </Form.Group> */}
    
              <Button type="submit">Update Car</Button>
            </Form>
        
          </Row>
        )
    }


}

// function UpdateCar() {
//     const { id } = useParams();
//     const {cars, setCars}=useContext(MainContext);
//     let CurrentCar = cars.filter((car) => car.id == id);
//         CurrentCar=CurrentCar[0];
//     const [modelName, setModelName] = useState(CurrentCar.modelName);
//     const [brandName, setBrandName] = useState(CurrentCar.brandName);
//     const [price, setPrice] = useState(CurrentCar.price);
//     const [manufactureYear, setManufactureYear] = useState(CurrentCar.manufactureYear);
//     const [urlImg, setUrlImg] = useState(CurrentCar.urlImg);
//     const [isPending, setIsPending] = useState(false);
//     const [error, setError] = useState(false);
//     const [success, setSuccess] = useState(false);
//     const history=useHistory();

//     const validation = () => {
    
//         if (!modelName || !brandName || !price || !manufactureYear || !urlImg) {
//           return false;
//         } else {
//           return true;
//         }
//       };

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         setError(false);

//         if(validation()===true){
//             let filterCar = cars.filter((car) => car.id != id);
//             const car = { modelName , brandName ,price,manufactureYear, urlImg, id: id };
//             setCars([...filterCar, car]);

//             setIsPending(true);
//             setSuccess(true);

//             setTimeout(() => {
//                 history.push("/");
//             }, 1000);
            

//         }else{
//             setError(true);
//         }
//     }
//     return (

//     )
// }

export default UpdateCar
