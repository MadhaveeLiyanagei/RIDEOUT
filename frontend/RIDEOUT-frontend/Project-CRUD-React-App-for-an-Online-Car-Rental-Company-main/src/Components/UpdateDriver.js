import React, { Component } from 'react'
import DriverService from '../services/DriverService';

class UpdateDriver extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.driver_id,
            driver_id:"",
            driver_name:"",
            email:"",
            nic:"",
            phone_number:"",
            gender:""
        }
        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeNICHandler = this.changeNICHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.updateDriver = this.updateDriver.bind(this);
    }

    componentDidMount(){
        DriverService.getDriverById(this.state.driver_id).then( (res) =>{
            let driver = res.data;
            this.setState({driver_id: driver.driver_id,
                driver_name: driver.driver_name,
                email : driver.email,
                nic:driver.nic,
                phone_number:driver.phone_number,
                gender:driver.gender
            });
        });
    }

    updateDriver = (e) => {
        e.preventDefault();
        const driver_id = {driver_id: this.state.driver_id, driver_name: this.state.driver_name, email: this.state.email,nic: this.state.nic,phone_number: this.state.phone_number,gender: this.state.gender};
        console.log('driver => ' + JSON.stringify(driver_id));
        console.log('driver_id => ' + JSON.stringify(this.state.driver_id));
        DriverService.updateDriver(driver_id, this.state.driver_id).then( res => {
            this.props.history.push(`/UpdateDriver/${driver_id}`);
        });
    }
 
    changeIdHandler= (event) => {
        this.setState({driver_id: event.target.value});
    }

    changeNameHandler= (event) => {
        this.setState({driver_name: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email: event.target.value});
    }

    changeNICHandler= (event) => {
        this.setState({nic: event.target.value});
    }

    changePhoneHandler= (event) => {
        this.setState({phone_number: event.target.value});
    }

    changeGenderHandler= (event) => {
        this.setState({gender: event.target.value});
    }

    cancel(){
        this.props.history.push('/driverdetail');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Driver</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Driver ID : </label>
                                            <input placeholder="Driver ID" name="driver_id" className="form-control" 
                                                value={this.state.driver_id} onChange={this.changeIdHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Driver Name: </label>
                                            <input placeholder="Driver Name" name="driver_name" className="form-control" 
                                                value={this.state.driver_name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email Address" name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> NIC: </label>
                                            <input placeholder="NIC" name="nic" className="form-control" 
                                                value={this.state.nic} onChange={this.changeNICHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Mobile: </label>
                                            <input placeholder="Mobile" name="phone_number" className="form-control" 
                                                value={this.state.phone_number} onChange={this.changePhoneHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Gender: </label>
                                            <input placeholder="Gender" name="gender" className="form-control" 
                                                value={this.state.gender} onChange={this.changeGenderHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateDriver}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateDriver
