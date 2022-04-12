import React, { Component } from 'react'
import DriverService from '../services/DriverService'
import axios from 'axios';

class ViewDriver extends Component {
    constructor(props) {
        super(props)

        this.state = {
            driver: this.props.match.params.driver_id,
            driver_id: {}
        }
    }

    componentDidMount(){
        DriverService.getDriverById(this.state.driver_id).then( res => {
            this.setState({driver: res.driver});
        })

        
        const driver_id = this.props.match.params.driver_id;

        axios.get(`http://localhost:8070/driver/get/${driver_id}`).then((res)=>{
            if(res.data.driver){
                this.setState({
                    driver_id:res.data.driver.driver_id,
                    driver_name:res.data.driver.driver_name,
                    email:res.data.driver.email,
                    nic:res.data.driver.nic,
                    phone_number:res.data.driver.phone_number,
                    gender:res.data.driver.gender
                });

                console.log(this.state.driver);
            }
        });
    }


    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Driver info</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Driver ID: </label>
                            <div value= { this.state.driver_id }></div>
                        </div>
                        <div className = "row">
                            <label> Driver Name: </label>
                            <div value= { this.state.driver_name }></div>
                        </div>
                        <div className = "row">
                            <label> Email:</label>
                            <div value={ this.state.email }></div>
                        </div>
                        <div className = "row">
                            <label> NIC:</label>
                            <div value={ this.state.nic }></div>
                        </div>
                        <div className = "row">
                            <label> Mobile:</label>
                            <div value= { this.state.phone_number }></div>
                        </div>
                        <div className = "row">
                            <label> Gender:</label>
                            <div value= { this.state.gender }></div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewDriver
