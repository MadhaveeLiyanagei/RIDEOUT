import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import  { Component } from "react";
import { getSupplierById,updateSupplier } from "../services/supplierService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2"; 
toast.configure();


class UpdateSupplier extends Component{

    constructor(props) {
        super(props)

        this.state = {
            supplier_id: this.props.match.params.supplier_id,
            supplier_name: "",
            email: "",
            nic: "",
            phone_number: "",
            gender: ""
        }
       
    }

    componentDidMount() {
        this.getSupplier();
      }


  
    onChangeSupplierName = (supplier_name) => {
        this.setState({
            supplier_name: supplier_name.target.value,
        });
      };
      onChangeSupplierEmail = (email) => {
        this.setState({
            email: email.target.value,
        });
      };
      onChangeSupplierNIC = (nic) => {
        this.setState({
            nic: nic.target.value,
        });
      };
      onChangeSupplierPhoneNumber = (phone_number) => {
        this.setState({
            phone_number: phone_number.target.value,
        });
      };

      onChangeSupplierGender = (gender) => {
        this.setState({
            gender: gender.target.value,
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


      getSupplier = async () =>{

        console.log(this.props.match.params.id)

        try{
             getSupplierById(this.props.match.params.id).then((res)=>{
            
                let supplier = res.data.post;
                 this.setState({supplier_id: supplier._id,
                    supplier_name: supplier.supplier_name,
                    email : supplier.email,
                    nic:supplier.nic,
                    phone_number:supplier.phone_number,
                    gender:supplier.gender
                 });
            })
       
  
        }catch(e){
            console.log(e);
        }
   }

   onSubmit = async(v)=>{

    console.log(this.state.supplier_name)

        if(this.state.supplier_name== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Supplier Name is Required !',  
           
          });  
          
        }
        if(this.state.email== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'E-mail is Required !',  
           
          });  
          
        }
        if(this.state.nic == ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'NIC is Required !',  
           
          });  
          
        }

        if(this.state.phone_number== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Phone Number is Required !',  
           
          });  
          
        }

        if(this.state.gender== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Gender is Required !',  
           
          });  
          
        }
    v.preventDefault();
    const supplier = {
        
        supplier_name: this.state.supplier_name,
        email: this.state.email,
        nic: this.state.nic,
        phone_number: this.state.phone_number,
        gender: this.state.gender
    };
    try {
        const sup = await updateSupplier(this.state.supplier_id,supplier);
        console.log(sup.status);
        toast('Successfully Updated!')
        this.props.history.push("/supplierList");
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
            <h2>Update Supplier</h2>
            <Form onSubmit={this.onSubmit} noValidate>
               
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Supplier Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder=" Supplier Name" value={this.state.supplier_name} onChange={this.onChangeSupplierName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    E-mail
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="E-mail" value={this.state.email} onChange={this.onChangeSupplierEmail} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    NIC
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="NIC" value={this.state.nic} onChange={this.onChangeSupplierNIC} noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Phone Number
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Phone Number" value={this.state.phone_number} onChange={this.onChangeSupplierPhoneNumber} noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                   Gender
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Gender" value={this.state.gender} onChange={this.onChangeSupplierGender} noValidate/>
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
    
              <Button type="submit" >Update Supplier</Button>
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

export default UpdateSupplier
