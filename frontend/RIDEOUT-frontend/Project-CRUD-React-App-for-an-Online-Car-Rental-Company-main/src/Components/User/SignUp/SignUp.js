import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  ToggleButton,
  Spinner,
} from "react-bootstrap";
import { UserSignUpService } from '../../../Services/UserServices'
import { signUpValidations } from '../../../Validations/UserValidations'
import { SweetAlert } from '../../../Services/SweetAlert'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      mobile: "",
      gender: "",
      nic: "",
      loading: false,
    };
  }

  // Function to handle input change
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle gender change
  handleGender = (gender) => {
    this.setState({
      gender,
    });
  };

  // Function to reset the form
  resetForm = () => {
    this.setState(this.state = {
      name: "",
      email: "",
      password: "",
      mobile: "",
      gender: "",
      nic: "",
      isShow: false,
    })
  }

  // Function to sign up
  signUp = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.mobile,
      gender: this.state.gender,
      nic: this.state.nic,
    }
    const result = signUpValidations(user);
    if (result.status) {
      await UserSignUpService(user).then(res => {
        this.setState({ loading: false });
        if (res.status) {
          this.props.history.push("/SignIn");
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
            <Card.Title className="text-center fs-2">SignUp</Card.Title>
            <Form onSubmit={this.signUp}>
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
              <Col className="text-end">
                <Link to="/SignIn">Already have an account? Sign in</Link>
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
                  <span className="ms-2">{this.state.loading ? "Please Wait..." : "SignUp"}</span>
                </Button>
                <Button variant="outline-danger" onClick={() => this.resetForm()} disabled={this.state.loading}>
                  Reset
                </Button>
              </Col>
            </Form>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default withRouter(SignUp);
