import React, { Component } from 'react'

import Navbarv from './Navbarv';
import { BrowserRouter } from 'react-router-dom';



export default class EditDriver extends Component{



    constructor(props){
        super(props);
        this.state={
           

           Driver_id:"",
           D_name:"",
           D_license:"",
           D_email:"",
           D_nic:"",
           D_mobile:""
        }
    }

    handleInputChange=(e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) =>{

       
        e.preventDefault();
        const id = this.props.match.params.id;

        const {Driver_id,D_name,D_license,D_email,D_nic,D_mobile} = this.state;

        const data ={
            Driver_id:Driver_id,
            D_name:D_name,
            D_license:D_license,
            D_email:D_email,
            D_nic:D_nic,
            D_mobile:D_mobile
        }

        console.log(data)

        axios.put(`http://localhost:8070/DriverDetail/post/update/${id}`,data).then((res) =>{
             if(res.data.success){
                 alert("post updated successfully")


                 this.setState(
                   {
                    Driver_id:"",
                    D_name:"",
                    D_license:"",
                    D_email:"",
                    D_nic:"",
                    D_mobile:""
                   }  
                 )
             }
        })
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:8070/DriverDetail/post/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({

                    Driver_id:data.post.Driver_id,
                    D_name:data.post.D_name,
                    D_license:data.post.D_license,
                    D_email:data.post.D_email,
                    D_nic:data.post.D_nic,
                    D_mobile:data.post.D_mobile
                    
                });

                console.log(this.state.post);
            }
        });
    }


   
    render() {
        return (


            <><BrowserRouter>
                <div className="container">
                    <Navbarv />

                </div>
            </BrowserRouter><div className="col-md-8 mt-4 mx-auto">
                    <h1 className="h3 mb-3 font-weight-normal">Update Driver</h1>&nbsp;
                    <form className="needs-validation" noValidate>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>Driver ID</label>
                            <input type="text"
                                className="form-control"
                                name="Driver_id"
                                placeholder="Enter Driver ID"
                                value={this.state.Driver_id}
                                onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}> Driver Name</label>
                            <input type="text"
                                className="form-control"
                                name="D_name"
                                placeholder="Enter Driver name"
                                value={this.state.D_name}
                                onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}> Driver License No</label>
                            <input type="text"
                                className="form-control"
                                name="D_license"
                                placeholder="Enter Driver License"
                                value={this.state.D_license}
                                onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}> Email</label>
                            <input type="text"
                                className="form-control"
                                name="D_email"
                                placeholder="Enter Email"
                                value={this.state.D_email}
                                onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}>NIC</label>
                            <input type="text"
                                className="form-control"
                                name="D_nic"
                                placeholder="Enter Driver NIC"
                                value={this.state.D_nic}
                                onChange={this.handleInputChange} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}> Mobile</label>
                            <input type="text"
                                className="form-control"
                                name="D_mobile"
                                placeholder="Enter Mobile"
                                value={this.state.D_mobile}
                                onChange={this.handleInputChange} />
                        </div>



                        <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={this.onSubmit}>
                            <i className="far fa-check-square"></i>
                            &nbsp;SAVE CHANGES
                        </button>

                    </form>

                </div></>
        );
    }


}