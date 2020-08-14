import React, { Component } from "react";
import fire from "../config/Fire";
import { Redirect, Link } from "react-router-dom";
import { Row, Col } from "antd";
import { Spring } from "react-spring/renderprops";
import axios from "axios";
// import { Form, Input, Button, Checkbox } from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { app } from "firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.logInEmailPassword = this.logInEmailPassword.bind(this);
    this.state = {
      redirect: false,
    };
  }

  // fire.auth().signOut();

  // SignIn
  // takes email and password from login and authenticates
  // If authenticated redirect is set to true allowing line 41 to work.
  logInEmailPassword(event) {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    axios
      .post("/api/user", {
        params: {
          email: email,
          password: password,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        localStorage.setItem("userID", response.data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.loginForm.reset();
        this.setState({ redirect: true });
      })
      .catch((error) => {
        console.log(error);
        window.alert("Username or password does not match our records. Please try again.")
        this.loginForm.reset();
      });
  }

  // Basic form included below. Email and password required.
  render() {
    if (this.state.redirect === true || localStorage.getItem("email")) {
      // If user is authenticated redirect to a diff page below
      //this isn't working how i want it to be
      return <Redirect to="/workout" />;
    }
    return (
      <div>
        <div className="loginPage">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={24}>
              <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {(props) => (
                  <div style={props}>
                    <h2 style={{ marginTop: "20px" }}>Welcome back!</h2>
                  </div>
                )}
              </Spring>
              {/* <h2 style={{ marginTop: "20px" }}>Welcome back!</h2> */}
              <h3>Login to your account:</h3>
              <form
                onSubmit={(event) => {
                  this.logInEmailPassword(event);
                }}
                ref={(form) => {
                  this.loginForm = form;
                }}
              >
                {/* <label className=""> */}

                <input
                  style={{
                    width: "50%",
                    margin: "10px",
                    marginTop: "20px",
                    height: "35px",
                    border: " 1px solid lightsteelblue",
                  }}
                  className=""
                  name="email"
                  type="email"
                  ref={(input) => {
                    this.emailInput = input;
                  }}
                  placeholder="Email"
                ></input>
                {/* </label> */}
                <br></br>
                {/* <label className=""> */}

                <input
                  style={{
                    width: "50%",
                    margin: "10px",
                    border: " 1px solid lightsteelblue",
                    height: "35px",
                  }}
                  className=""
                  name="password"
                  type="password"
                  ref={(input) => {
                    this.passwordInput = input;
                  }}
                  placeholder="Password"
                ></input>
                {/* </label> */}
                <br></br>
                <input
                  style={{
                    margin: "10px",
                    backgroundColor: "lightcoral",
                    width: "100px",
                    height: "35px",
                    color: "white",
                    border: "1px solid white",
                    borderRadius: "15px",
                  }}
                  type="submit"
                  className="button"
                  value="Log In"
                ></input>
                <br></br>
                <label>Don't Have An Account?</label>
                <br></br>
                {/* <a href="/signup">Register Here</a> */}
                <Link to={`/signup`} activeClassName="active">
                  Register Here
                </Link>
                <br></br>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Login;
