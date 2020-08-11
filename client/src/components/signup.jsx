import React, { Component } from "react";
import fire from "../config/Fire";
import { Redirect, Link } from "react-router-dom";
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
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("Logged In");
        this.loginForm.reset();
        this.setState({ redirect: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirect === true) {
      // If user is authenticated redirect to a diff page below
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h2 style={{ marginTop: "20px" }}>Create an Account: </h2>
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
              border: " 1px solid #f18f8e",
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
              border: " 1px solid #f18f8e",
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
              backgroundColor: "coral",
              color: "white",
              border: "1px solid white",
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
