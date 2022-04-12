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
import { UserSignInService } from '../../../services/UserServices'
import { signInValidations } from '../../../Validations/UserValidations'
import { SweetAlert } from '../../../services/SweetAlert.js'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loading: false,
        };
    }

    static contextType = MainContext;

    // Function to handle input change
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    // Function to sign up
    signUp = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let user = {
            email: this.state.email,
            password: this.state.password,
        }
        const result = signInValidations(user);
        if (result.status) {
            await UserSignInService(user).then(res => {
                this.setState({ loading: false });
                if (res.status) {
                    this.context.setIsAuthenticated(true);
                    this.props.history.push("/");
                }
            })
        } else {
            this.setState({ loading: false });
            SweetAlert("error", "Ooopz!", result.error)
        }
    };

    render() {
        return (
            <React.Fragment>
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center fs-2">SignIn</Card.Title>
                        <Form onSubmit={this.signUp}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-start">Email address</Form.Label>
                                <Form.Control
                                    disabled={this.state.loading}
                                    name="email"
                                    value={this.state.email}
                                    onChange={(e) => this.handleInputChange(e)}
                                    placeholder="Enter email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-start">Password</Form.Label>
                                <Form.Control
                                    disabled={this.state.loading}
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleInputChange(e)}
                                    placeholder="Enter password"
                                />
                            </Form.Group>
                            <Col className="text-end">
                                <Link to="/SignUp">Don't have an account? Sign Up</Link>
                            </Col>
                            <Col className="text-center">
                                <Button variant="outline-primary" type="submit" className="me-1" disabled={this.state.loading}>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className={this.state.loading ? "" : "visually-hidden"}
                                    />
                                    <span className="ms-2">{this.state.loading ? "Please Wait..." : "SignIn"}</span>
                                </Button>
                            </Col>
                        </Form>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}

export default withRouter(SignIn);
