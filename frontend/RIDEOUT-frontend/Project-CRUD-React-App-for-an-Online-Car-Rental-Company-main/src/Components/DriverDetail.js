import React, { Component } from 'react'
import {Form, Row, Col, Button, Alert, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import Swal from "sweetalert2";
import ReactDOM from "react-dom";

import Pdf from "react-to-pdf";

import { getAllDrivers, deleteDriverByID } from './../services/DriverService';


const ref = React.createRef();
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
              const dri =  deleteDriverByID(id);
    
      
    
              this.getAllDrivers();    
              this.setState({
                    driver: this.state.driver.filter((dri) => dri.id !== id),
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




      


    //   retrieveDriverDetails() {
    //     axios.get("http://localhost:3000/driver/").then(res => {
    //         if (res.data.success) {
    //             this.setState({
    //               DriverDetails: res.data.existingdriverdetails
    //             });

    //             console.log(this.state.DriverDetails)
    //         }


    //     });
    // }







    //   filterData(driver, searchkey) {

    //     const result = driver.filter((driver) =>
    //     driver.driver_name.includes(getAllDrivers,searchkey)
    //     // driver.driver_name.includes(searchkey) ||
    //     // driver.email.toLowerCase().includes(searchkey) ||
    //     // driver.nic.toLowerCase().includes(searchkey) ||
    //     // driver.phone_number.toLowerCase().includes(searchkey)
    //     )

    //     this.setState({ driver: result })
    // }

    // handleSearchArea = (e) => {
    //     console.log(e.currentTarget.value);
      
    //     const searchkey = e.currentTarget.value;
    //     getAllDrivers = async () => {
    //       try {
    //         const dri = await getAllDrivers();
    //         console.log(dri.data);
    //         this.setState({ driver: dri.data || [] });
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     };
  

    //   //  axios.get("http://localhost:3000/driver/").then(res =>{
    //   //    if(res.data.success){
    //   //      this.filterData(res.data.getAllDrivers,searchkey)
    //   //    }
    //   //  })
    //     };


        // axios.get("http://localhost:3000/driver/").then(res => {
        //     if (res.data.success) {

        //         this.filterData(res.data.existingdriverdetails, searchkey)

        //     }
        // });

    





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
                 <h2 className="text-center">Driver List</h2>
                 
                 <div className = "row">
                 
               
                <br></br>
                    <button className="btn btn-primary" onClick={()=> {this.props.history.replace('/driver/add')}}>  Add New Driver</button>
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
                                                 {/* <button style={{marginLeft: "10px"}} onClick={ () => this.viewDriver(driver.driver_id)} className="btn btn-info">View </button>
                                              */}
                                             </td>
                          
                                        </tr>
                                )
                                }
                                  
                            </tbody>
                     
                        </table>
                       
                 </div>     
                
                              

            </div>


            <Pdf targetRef={ref}  filename="expensereport.pdf">
                    {({ toPdf }) => <button className="btn btn-success" onClick={toPdf}>Capture report as PDF</button>}
                     </Pdf>




            </div>



        )
    }
}

export default DriverDetail
