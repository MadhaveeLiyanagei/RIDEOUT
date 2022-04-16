import React, { Component } from 'react'
import {Form, Row, Col, Button, Alert, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';

//import axios from 'axios';

import {toast} from 'react-toastify';

import { getAllSuppliers, deleteSupplierByID } from './../services/supplierService';

class SupplierList extends Component {
    constructor(props) {
        super(props)

        this.state = {
          supplier: []
        }
       
    }
    componentDidMount() {
      this.getAllSuppliers();
    }

    getAllSuppliers = async () => {
        try {
          const sup = await getAllSuppliers();
          console.log(sup.data);
          this.setState({ supplier: sup.data || [] });
        } catch (e) {
          console.log(e);
        }
      };

      deleteSupplier = async (id) => {
        try {
          const sup = await deleteSupplierByID(id);
    
          console.log(sup.data);

          this.getAllSuppliers();    
          this.setState({
            supplier: this.state.supplier.filter((sup) => sup.id !== id),
          });
          toast('Deleted!')
        } catch (e) {
          console.log(e);
        }
      };

    // deleteVehicle(supplier_id){
    //    DriverService.deleteDriver(supplier_id).then( res => {
    //         this.setState({supplier: this.state.supplier.filter(supplier => supplier.supplier_id !== supplier_id)});
    //     });
    // }
    // viewDriver(supplier_id){
    //     this.props.history.push(`/ViewSupplier/${supplier_id}`);
    // }
    // updateDriver(driver_id){
    //     this.props.history.push(`/UpdateSupplier/${driver_id}`);
    // }

    // componentDidMount(){
    //     DriverService.getDriver().then((res) => {
    //         this.setState({ driver: res.data});
    //     });
    // }

    // addDriver(){
    //     this.props.history.push(`/driver`);
    // }


    // componentDidMount(){
    //     this.retrievedPosts();
    //   }
      
    //   retrievedPosts(){
        
    //       axios.get(`http://localhost:8070/driver`).then(res =>{
    //         if(res.data){
    //           this.setState({
    //             driver:res.data
    //           });
      
    //           console.log(this.state.driver)
    //         }
      
    //       })
    //   } 
    //     onDelete = (driver_id) =>{
    //       axios.delete(`http://localhost:8070/driver/delete/${driver_id}`).then((_res)=>{
    //         alert("Details Deleted Successfully.");
    //         this.retrievedPosts();
      
    //       })
    //     }  
      
    //     filterData(qualities,searchKey){
      
    //       const result = qualities.filter((post) =>
    //       post.prodType.toLowerCase().includes(searchKey)||
    //       post.prodBrandName.toLowerCase().includes(searchKey)
    //       )
    //       this.setState({Qualities:result})
    //     }
      
    //     handleSearchArea = (e) =>{
    //       const searchKey= e.currentTarget.value;
      
    //       axios.get("http://localhost:8070/Driver/qualities").then(res =>{
    //         if(res.data.success){
    //           this.filterData(res.data.existingQualities,searchKey)
             
    //         }
    //       });
      
      
    //     }

    render() {
        
        return (
            <div>
                 <h2 className="text-center">Supplier List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addSupplier}>  Add Supplier</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                   
                                    <th> Supplier Name</th>
                                    <th> E-mail</th>
                                    <th> NIC</th>
                                    <th> Mobile</th>
                                    <th> Gender</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {  this.state.supplier.map(
                                    supplier =>
                                      
                                        <tr>
                                               
                                             <td> {supplier.supplier_name}</td>
                                             <td> {supplier.email}</td>
                                             <td> {supplier.nic}</td>
                                             <td> {supplier.phone_number}</td>
                                             <td> {supplier.gender}</td>

                                             <td>
                                                 <Button as={Link} to={`/updateSupplier/${supplier._id}`} style={{marginLeft: "10px"}}  className="btn btn-info">Update </Button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSupplier(supplier._id)} className="btn btn-danger">Delete </button>
                                                 
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

export default SupplierList
