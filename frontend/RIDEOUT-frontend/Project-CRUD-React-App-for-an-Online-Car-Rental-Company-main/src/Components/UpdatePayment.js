import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import  { Component } from "react";
import { getPaymentById,updatePayment } from "../services/PaymentService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


class UpdatePayment extends Component{

    constructor(props) {
        super(props)

        this.state = {
            payment_id: this.props.match.params.payment_id,
            userName: "",
            vehicleNo: "",
            paidtDate: "",
            total: ""
        }
       
    }

    componentDidMount() {
        this.getPayment();
      }


  
    onChangeUserName = (userName) => {
        this.setState({
            userName: userName.target.value,
        });
      };
      onChangeVehicleNo = (vehicleNo) => {
        this.setState({
            vehicleNo: vehicleNo.target.value,
        });
      };
      onChangePaidtDate = (paidtDate) => {
        this.setState({
            paidtDate: paidtDate.target.value,
        });
      };
      onChangeTotal = (total) => {
        this.setState({
            total: total.target.value,
        });
      };


    // onChanageVehicleModelName = (modelName) => {
    //     this.setState({
    //         modelName: modelName.target.value,
    //     });
    //   };
    //   onChanageVehicleBrandName = (brandName) => {
    //     this.setState({
    //         brandName: brandName.target.value,
    //     });
    //   };
    //   onChanageVehicleManufactureYear = (manufactureYear) => {
    //     this.setState({
    //         manufactureYear: manufactureYear.target.value,
    //     });
    //   };
    //   onChanageVehiclePrice = (price) => {
    //     this.setState({
    //         price: price.target.value,
    //     });
    //   };


      getPayment = async () =>{

        console.log(this.props.match.params.id)

        try{
             getPaymentById(this.props.match.params.id).then((res)=>{
            
                let payment = res.data.post;
                 this.setState({payment_id: payment._id,
                    userName: payment.userName,
                    vehicleNo : payment.vehicleNo,
                    paidtDate:payment.paidtDate,
                    total:payment.total,
                
                 });
            })
       
  
        }catch(e){
            console.log(e);
        }
   }

   onSubmit = async(v)=>{
    v.preventDefault();
    const payment = {
        
        userName: this.state.userName,
        vehicleNo: this.state.vehicleNo,
        paidtDate: this.state.paidtDate,
        total: this.state.total,
     
    };
    try {
        const sup = await updatePayment(this.state.payment_id,payment);
        console.log(sup.status);
        toast('Successfully Updated!')
        this.props.history.push("/paymentList");
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
            <h2>Update Payment</h2>
            <Form onSubmit={this.onSubmit} noValidate>
               
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    User Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder=" User Name" value={this.state.userName} onChange={this.onChangeUserName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    E-mail
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="E-mail" value={this.state.email} onChange={this.onChangeVehicleNo} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    NIC
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="NIC" value={this.state.nic} onChange={this.onChangePaidtDate} noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Phone Number
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Phone Number" value={this.state.phone_number} onChange={this.onChangeTotal} noValidate/>
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
    
              <Button type="submit" >Update Payment</Button>
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

export default UpdatePayment
