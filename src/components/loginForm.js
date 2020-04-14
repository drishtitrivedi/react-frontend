import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      logging: 0,
      loginObject: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log("Authentication");

    fetch(`/authenticate/${this.state.username}/${this.state.password}`)
      .then((res) => res.json())
      .then((loginObject) =>
        this.setState({ loginObject: loginObject, logging: 1 })
      );

    localStorage.setItem("userToken", this.state.username);
  }

  componentDidMount() {}

  render() {
    if (this.state.loginObject.length === 1) {
      return <Redirect to="/customers" />;
    }

    return (
      <React.Fragment>
        <div
          className="container mt-5"
          style={{
            width: 600,
            height: 400,
          }}
        >
          <h3 className="pt-5">Log in</h3>
          <p>
            {this.state.logging === 1 && (
              <div role="alert" class="fade alert alert-danger show mt-2">
                Incorrect Username or Password!
              </div>
            )}
          </p>
          <div className="page-header d-flex justify-content-center mt-3">
            <Form style={{ width: 600 }} onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  autoFocus
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>

              <Button variant="secondary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginForm;
