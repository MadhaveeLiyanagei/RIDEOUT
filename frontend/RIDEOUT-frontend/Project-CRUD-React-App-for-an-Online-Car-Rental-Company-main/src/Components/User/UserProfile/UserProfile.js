import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { MainContext } from '../../../Contexts/MainContext'
import {
    Button,
    ButtonGroup,
    Card,
    Col,
    Form,
    Spinner,
    ToggleButton,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { deleteUserAccountService } from '../../../Services/UserServices'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            mobile: "",
            gender: "",
            nic: "",
            loading: true,
            updating: false,
            deleting: false,
        };
    }

    updateProfileDetails = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            this.props.history.push("/SignIn");
        } else {
            this.setState({
                loading: false,
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                gender: user.gender,
                nic: user.nic,
            });
        }
    }

    componentDidMount() {
        this.updateProfileDetails()
    }

    static contextType = MainContext;

    // Function to handle input change
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    // Delete account function
    deleteMyAccount = () => {
        this.setState({
            loading: true,
            deleting: true
        })
        Swal.fire({
            title: 'Confirmation',
            text: "Are you want to delete your account.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUserAccountService(this.state.id).then(res => {
                    if (res.status) {
                        this.context.setIsAuthenticated(true);
                        this.props.history.push("/SignIn");
                    }
                })
            }
        })

        this.setState({
            loading: false,
            deleting: false
        })
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center fs-2">User Profile</Card.Title>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-start">User Email</Form.Label>
                                <Form.Control
                                    disabled
                                    value={this.state.email}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-start">User Name</Form.Label>
                                <Form.Control
                                    disabled={this.state.loading}
                                    name="name"
                                    value={this.state.name}
                                    onChange={(e) => this.handleInputChange(e)}
                                    placeholder="Enter user name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-start">Mobile Number</Form.Label>
                                <Form.Control
                                    disabled={this.state.loading}
                                    name="mobile"
                                    value={this.state.mobile}
                                    onChange={(e) => this.handleInputChange(e)}
                                    placeholder="Enter mobile number"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="text-start">NIC</Form.Label>
                                <Form.Control
                                    disabled={this.state.loading}
                                    name="nic"
                                    value={this.state.nic}
                                    onChange={(e) => this.handleInputChange(e)}
                                    placeholder="Enter NIC"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-start d-block">Gender</Form.Label>
                                <ButtonGroup>
                                    <ToggleButton
                                        disabled={this.state.loading}
                                        key={"male"}
                                        id={"male"}
                                        type="radio"
                                        name="male"
                                        checked={this.state.gender === "male"}
                                        onChange={(e) => this.handleGender("male")}
                                        variant={'outline-primary'}
                                    >
                                        Male
                                    </ToggleButton>
                                    <ToggleButton
                                        disabled={this.state.loading}
                                        key={"female"}
                                        id={"female"}
                                        type="radio"
                                        name="female"
                                        checked={this.state.gender === "female"}
                                        onChange={() => this.handleGender("female")}
                                        variant={'outline-primary'}
                                    >
                                        Female
                                    </ToggleButton>
                                </ButtonGroup>
                            </Form.Group>
                            <Col className="text-center">
                                <Button variant="success" type="submit" className="me-1" disabled={this.state.loading}>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className={this.state.loading && this.state.updating ? "" : "visually-hidden"}
                                    />
                                    <span className="ms-2">{this.state.loading && this.state.updating ? "Please Wait..." : "Update Profile"}</span>
                                </Button>
                                <Button variant="danger" className="me-1" disabled={this.state.loading} onClick={() => this.deleteMyAccount()}>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className={this.state.loading && this.state.deleting ? "" : "visually-hidden"}
                                    />
                                    <span className="ms-2">{this.state.loading && this.state.deleting ? "Please Wait..." : "Delete Profile"}</span>
                                </Button>
                            </Col>
                        </Form>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default withRouter(UserProfile);
