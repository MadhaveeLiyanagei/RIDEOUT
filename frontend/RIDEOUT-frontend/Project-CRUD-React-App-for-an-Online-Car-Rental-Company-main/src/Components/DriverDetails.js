import React, { Component } from 'react'

import axios from 'axios';
import Navbarv from './Navbarv';
import { BrowserRouter } from 'react-router-dom';

export default class DriverDetails extends Component{
    constructor(props){
        super(props);

        this.state={
            post:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`http://localhost:8070/DriverDetail/post/${id}`).then((res)=>{
            if(res.data.success){
                this.setState({
                    post:res.data.post
                });

                console.log(this.state.post);
            }
        });
    }

    render() {

        const {Driver_id,D_name,D_license,D_email,D_nic,D_mobile } = this.state.post;

        return (

            
                <><BrowserRouter>
                <div className="container">
                    <Navbarv />

                </div>
            </BrowserRouter><div style={{ marginTop: '20px' }}>
                    <hr />
                    <h4>{Driver_id}</h4>
                    <hr /><hr />

                    <dl className="row">
                        <dt className="col-sm-3">Driver Name</dt>
                        <dd className="col-sm-9">{D_name}</dd>

                        <dt className="col-sm-3"> Driver License Number</dt>
                        <dd className="col-sm-9">{D_license}</dd>

                        <dt className="col-sm-3">E-mail</dt>
                        <dd className="col-sm-9">{D_email}</dd>

                        <dt className="col-sm-3">NIC</dt>
                        <dd className="col-sm-9">{D_nic}</dd>

                        <dt className="col-sm-3">Mobile</dt>
                        <dd className="col-sm-9">{D_mobile}</dd>



                    </dl>
                </div></>
        )
    }
}