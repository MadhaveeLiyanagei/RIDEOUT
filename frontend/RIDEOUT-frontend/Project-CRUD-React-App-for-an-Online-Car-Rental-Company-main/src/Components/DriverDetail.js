import React, { Component } from 'react'
import {Form, Row, Col, Button, Alert, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

import { getAllDrivers, deleteDriverByID } from './../services/DriverService';

class DriverDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
          driver: [],
          searchedText: ""
        }
       
    }
    componentDidMount() {
      this.getAllDrivers();
      
    }

    getAllDrivers = async () => {
        try {
          const dri = await getAllDrivers();
          console.log(dri.data);
          this.setState({ driver: dri.data || [] });
        } catch (e) {
          console.log(e);
        }
      };

      deleteDriver = async (id) => {
        try {
          const dri = await deleteDriverByID(id);
    
          console.log(dri.data);

          this.getAllDrivers();    
          this.setState({
            driver: this.state.driver.filter((dri) => dri.id !== id),
          });
          toast('Deleted!')
        } catch (e) {
          console.log(e);
        }
      };

      viewDriver(driver_id){
        this.props.history.push(`/ViewDriver/${driver_id}`);
         }
         
         

         handleSearch = (event) => {
          let driver_name = event.target.value.toLowerCase();
          let result = [];
          console.log(driver_name);
          result = getAllDrivers.filter((data) => {
          return data.driver.search(driver_name) != -1;
          });
          setFilteredData(result);
          }

    render() {
   
        return (
            <div>
                 <h2 className="text-center">Driver List</h2>
                 
                 <div className = "row">
                 <input className="form-control"  type="text" onChange={(event) =>handleSearch(event)}>
                </input>
                
                <br></br>
                    <button className="btn btn-primary" onClick={()=> {this.props.history.replace('/driver/add')}}>  Add Driver</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                   
                                    <th> Driver Name</th>
                                    <th> E-mail</th>
                                    <th> NIC</th>
                                    <th> Mobile</th>
                                    <th> Gender</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {  this.state.driver.map(
                                    driver =>
                                      
                                        <tr>
                                               
                                             <td> {driver.driver_name}</td>
                                             <td> {driver.email}</td>
                                             <td> {driver.nic}</td>
                                             <td> {driver.phone_number}</td>
                                             <td> {driver.gender}</td>

                                             <td>
                                                 <Button as={Link} to={`/updateDriver/${driver._id}`} style={{marginLeft: "10px"}}  className="btn btn-info">Update </Button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDriver(driver._id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewDriver(driver.driver_id)} className="btn btn-info">View </button>
                                             
                                             </td>
                                        </tr>
                                )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default DriverDetail
