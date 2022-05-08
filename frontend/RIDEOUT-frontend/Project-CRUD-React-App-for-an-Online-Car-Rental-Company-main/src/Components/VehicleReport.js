import React, { Component } from 'react'
import {Form, Row, Col, Button, Alert, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import Swal from "sweetalert2";
import ReactDOM from "react-dom";
import Pdf from "react-to-pdf";
import { getAllVehicles, deleteVehicleByID } from './../services/carService';

const ref = React.createRef();
class VehicleReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
          vehicle: [],
          searchedText: ""
        }
 
    }
    componentDidMount() {
      this.getAllVehicles();
      
    }

    getAllVehicles = async () => {
        try {
          const vehi = await getAllVehicles();
          console.log(vehi.data);
          this.setState({ vehicle: vehi.data || [] });
        } catch (e) {
          console.log(e);
        }
      };

      deleteVehicle = async (id) => {
        Swal.fire(
          {  
          title: 'Are you sure?',  
          text: 'User will have Admin Privileges',  
          icon: 'warning',  
          showCancelButton: true,  
          confirmButtonColor: '#3085d6',  
          cancelButtonColor: '#d33',  
          confirmButtonText: 'Yes!'  
        }).then((result)=>{
          console.log(result)
          if(result.isConfirmed == true){
            try {
              const vehi =  deleteVehicleByID(id);

              this.getAllVehicles();    
              this.setState({
                    vehicle: this.state.vehicle.filter((vehi) => vehi.id !== id),
              });
              toast('Successfully Deleted!')
    
            } catch (e) {
              console.log(e);
            }
          }else{
           
            Swal.fire({  
              icon: 'info',  
              title: 'OK..',  
              text: 'Driver details are safe!',  
             
            }); 
          }
        });
      }

      filterData(vehicle, searchkey) {

        const result = vehicle.filter((vehicle) =>

        vehicle.modelName.includes(searchkey) ||
        vehicle.manufactureYear.toLowerCase().includes(searchkey) ||
        vehicle.brandName.toLowerCase().includes(searchkey) ||
        vehicle.price.toLowerCase().includes(searchkey)
        )

        this.setState({ vehicle: result })
    }

    handleSearchArea = (e) => {

        const searchkey = e.currentTarget.value;

        axios.get("http://localhost:3000/vehicle/").then(res => {
            if (res.data.success) {

                this.filterData(res.data.getAllVehicles, searchkey)
            }
        });

    }

      // deleteDriver = async (id) => {
      //   try {
      //     const dri = await deleteDriverByID(id);
    
      //     console.log(dri.data);

      //     this.getAllDrivers();    
      //     this.setState({
      //       driver: this.state.driver.filter((dri) => dri.id !== id),
      //     });
      //     toast('Deleted!')
      //   } catch (e) {
      //     console.log(e);
      //   }
      // };

    render() {
   
        return (

  <div className="App">
            <div>
                 <h2 className="text-center">Vehicle List</h2>
                 
                 <div className = "row">
                 
               
                <br></br>
                    <button className="btn btn-primary" onClick={()=> {this.props.history.replace('/create')}}>  Add New Vehicle</button>
                 </div>

                 <div className="col-lg-3 mt-2 mb-2">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="search"
                                name="searchQuery"
                                aria-label="Search"
                                onChange={this.handleSearchArea}>

                            </input>
                        </div>

                 <br></br>
                 <div className = "row"  ref={ref}  >
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Model Name</th>
                                    <th> Brand Name</th>
                                    <th> Manufacture Year</th>
                                    <th> Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {  this.state.vehicle.map(
                                    car =>
                                      
                                        <tr>
                                               
                                             <td> {car.modelName}</td>
                                             <td> {car.brandName}</td>
                                             <td> {car.manufactureYear}</td>
                                             <td> {car.price}</td>
                                             
                                         
                                        </tr>
                                )
                                }
                                  
                            </tbody>
                     
                        </table>
                       
                 </div>                    

            </div>


            <Pdf targetRef={ref}  filename="Vehicle.pdf">
                    {({ toPdf }) => <button className="btn btn-success" onClick={toPdf}>Capture report as PDF</button>}
            </Pdf>

            </div>

        )
    }
}
export default VehicleReport
