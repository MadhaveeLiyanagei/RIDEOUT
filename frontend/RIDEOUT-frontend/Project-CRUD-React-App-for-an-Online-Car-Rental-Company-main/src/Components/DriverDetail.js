import React, { Component } from 'react'
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import DriverService from '../services/DriverService';

class DriverDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            driver: []
        }
        this.addDriver = this.addDriver.bind(this);
        this.updateDriver = this.updateDriver.bind(this);
        this.deleteDriver = this.deleteDriver.bind(this);
    }

    deleteDriver(driver_id){
       DriverService.deleteDriver(driver_id).then( res => {
            this.setState({driver: this.state.driver.filter(driver => driver.driver_id !== driver_id)});
        });
    }
    viewDriver(driver_id){
        this.props.history.push(`/ViewDriver/${driver_id}`);
    }
    updateDriver(driver_id){
        this.props.history.push(`/UpdateDriver/${driver_id}`);
    }

    componentDidMount(){
        DriverService.getDriver().then((res) => {
            this.setState({ driver: res.data});
        });
    }

    addDriver(){
        this.props.history.push(`/driver`);
    }


    componentDidMount(){
        this.retrievedPosts();
      }
      
      retrievedPosts(){
        
          axios.get(`http://localhost:8070/driver`).then(res =>{
            if(res.data){
              this.setState({
                driver:res.data
              });
      
              console.log(this.state.driver)
            }
      
          })
      } 
        onDelete = (driver_id) =>{
          axios.delete(`http://localhost:8070/driver/delete/${driver_id}`).then((_res)=>{
            alert("Details Deleted Successfully.");
            this.retrievedPosts();
      
          })
        }  
      
        filterData(qualities,searchKey){
      
          const result = qualities.filter((post) =>
          post.prodType.toLowerCase().includes(searchKey)||
          post.prodBrandName.toLowerCase().includes(searchKey)
          )
          this.setState({Qualities:result})
        }
      
        handleSearchArea = (e) =>{
          const searchKey= e.currentTarget.value;
      
          axios.get("http://localhost:8070/Driver/qualities").then(res =>{
            if(res.data.success){
              this.filterData(res.data.existingQualities,searchKey)
             
            }
          });
      
      
        }

    render() {
        
        return (
            <div>
                 <h2 className="text-center">Driver List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addDriver}>  Add Driver</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Driver ID</th>
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
                                             <td> {driver.driver_id} </td>   
                                             <td> {driver.driver_name}</td>
                                             <td> {driver.email}</td>
                                             <td> {driver.nic}</td>
                                             <td> {driver.phone_number}</td>
                                             <td> {driver.gender}</td>

                                             <td>
                                                 <button onClick={ () => this.updateDriver(driver.driver_id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDriver(driver.driver_id)} className="btn btn-danger">Delete </button>
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
