import React, { Component } from 'react'
import {getDriverById} from '../services/DriverService'


class ViewDriver extends Component {
    constructor(props) {
        super(props)

        this.state = {
            driver_id: this.props.match.params.driver_id,
            driver_name: "",
            email: "",
            nic: "",
            phone_number: "",
            gender: ""
        }
    }

    componentDidMount(){
        this.getDriver();
    }

    getDriver = async () =>{

        console.log(this.props.match.params.id)

        try{
             getDriverById(this.props.match.params.id).then((res)=>{
            
                let driver = res.data.post;
                 this.setState({driver_id: driver._id,
                    driver_name: driver.driver_name,
                    email : driver.email,
                    nic:driver.nic,
                    phone_number:driver.phone_number,
                    gender:driver.gender
                 });
            })
       
  
        }catch(e){
            console.log(e);
        }
   }


    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Driver info</h3>
                    <div className = "card-body">
                        
                        <div className = "row">
                            <label> Driver Name: </label>
                            <label><div type="text" placeholder="Name" value= { this.state.driver_name }></div></label>
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
