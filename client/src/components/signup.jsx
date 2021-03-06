import React, { Component } from "react";
import fire from "../config/Fire";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Spring } from "react-spring/renderprops";
import { Row, Col } from "antd";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.signUpEmailPassword = this.signUpEmailPassword.bind(this);
    this.state = {
      redirect: false,
    };
  }

  signUpEmailPassword(event) {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    axios
      .post("/api/signup", { email, password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("userID", response.data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ redirect: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/workout" />;
    }

    const styles = {
      inputBox: {
        width: "50%",
        margin: "10px",
        marginTop: "20px",
        border: " 1px solid lightsteelblue",
        height: "35px",
      },
    };
    return (
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={24}>
            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {(props) => (
                <div style={props}>
                  <h2 style={{ marginTop: "20px" }}>Create an Account</h2>
                </div>
              )}
            </Spring>
            <form
              onSubmit={(event) => {
                this.signUpEmailPassword(event);
              }}
              ref={(form) => {
                this.loginForm = form;
              }}
            >
              <input
                style={styles.inputBox}
                className=""
                name="email"
                type="email"
                ref={(input) => {
                  this.emailInput = input;
                }}
                placeholder="Email"
              ></input>
              <input
                style={styles.inputBox}
                className=""
                name="password"
                type="password"
                ref={(input) => {
                  this.passwordInput = input;
                }}
                placeholder="Password"
              ></input>
              <br></br>
              <input
                style={{
                  margin: "10px",
                  backgroundColor: "darksalmon",
                  width: "100px",
                  height: "35px",
                  color: "white",
                  border: "1px solid #ECFEE8",
                  borderRadius: "12px",
                }}
                type="submit"
                className="button"
                value="Sign Up"
              ></input>
              <br></br>
              <label>Already Have An Account?</label>
              <br></br>
              <Link to={`/`} activeClassName="active">
                Login Here
              </Link>
              <br></br>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignUp;
