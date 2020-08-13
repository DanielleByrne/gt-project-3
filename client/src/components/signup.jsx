import React, { Component } from "react";
import fire from "../config/Fire";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Spring } from "react-spring/renderprops";
// import { app } from "firebase";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.signUpEmailPassword = this.signUpEmailPassword.bind(this);
    this.state = {
      redirect: false,
    };
  }
  // fire.auth().signOut(); code needed to sign out of page. easily attached to button

  // Sign up function
  // takes email and password with signup (may be able to store more data with setValue)
  // similar to login once user is created, redirect will be set to true and user will be redirected.
  signUpEmailPassword(event) {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    // CREATES NEW USER, SAVES USER ID TO LOCAL STORAGE
    axios
      .post("/api/signup", { email, password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("userID", response.data.data._id)
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
      // If user is authenticated redirect to a diff page below
      return <Redirect to="/workout" />;
    }
    return (
      <div>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {(props) => (
            <div style={props}>
              <h2 style={{ marginTop: "20px" }}>Create an Account</h2>
            </div>
          )}
        </Spring>
        {/* <h2 style={{ marginTop: "20px" }}>Create an Account: </h2> */}
        <form
          onSubmit={(event) => {
            this.signUpEmailPassword(event);
          }}
          ref={(form) => {
            this.loginForm = form;
          }}
        >
          {/* <label className="">
            Email */}
          <input
            style={{
              width: "50%",
              margin: "10px",
              marginTop: "20px",
              border: " 1px solid lightsteelblue",
              height: "35px",
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
          {/* <label className="">
            Password */}
          <input
            style={{
              width: "50%",
              margin: "10px",
              marginTop: "20px",
              // border: " 1px solid #ECFEE8",
              border: "1px solid lightsteelblue",
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
          <br></br>
          {/* </label> */}
          <input
            style={{
              margin: "10px",
              margin: "10px",
              backgroundColor: "lightcoral",
              width: "100px",
              height: "35px",
              color: "white",
              border: "1px solid #ECFEE8",
              borderRadius: "12px",
            }}
            type="submit"
            className="button"
            // I CHANGED THE VALUE OF THE BUTTON TO SIGN UP I DON'T KNOW IF THAT MESSES ANYTHING UP

            value="Sign Up"
          ></input>
        </form>
      </div>
    );
  }
}

export default SignUp;
