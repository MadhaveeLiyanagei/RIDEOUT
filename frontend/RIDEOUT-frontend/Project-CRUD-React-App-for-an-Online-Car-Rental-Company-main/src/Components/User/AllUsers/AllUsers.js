import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { MainContext } from '../../../Contexts/MainContext'
import {
    Button,
    Card,
    Col,
    Form,
    Spinner,
} from "react-bootstrap";
import { getAllUserAccountsService } from '../../../services/UserServices'

class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            loading: true,
        };
    }

    componentDidMount() {
        getAllUserAccountsService().then(res => {
            if (res.status) {
                this.setState({
                    allUsers: res.users,
                    loading: false
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center fs-2">All Users</Card.Title>
                        {
                            this.state.loading
                                ? <Col className="text-center">
                                    <Spinner animation="border" variant="primary" />
                                    <Card.Text className="text-primary">Please Wait...</Card.Text>
                                </Col>
                                : <React.Fragment>
                                    <form class="form-inline d-flex w-25 mb-3">
                                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                    </form>
                                    <table class="table">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">User Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Mobile</th>
                                                <th scope="col">NIC</th>
                                                <th scope="col">Gender</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.allUsers.map(user => {
                                                    return <tr>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.mobile}</td>
                                                        <td>{user.nic}</td>
                                                        <td>{user.gender}</td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Col className="text-center">
                                        <Button variant="outline-primary" className="me-1" disabled={this.state.loading}>Generate Report</Button>
                                    </Col>
                                </React.Fragment>
                        }
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default withRouter(AllUsers);
