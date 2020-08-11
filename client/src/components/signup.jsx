import React, { Component } from "react";
import fire from "../config/Fire";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
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
    axios
    .post("/api/user", { email, password })
    .then((response) => {
      console.log(response.data)
    .catch((err) => {
      console.log(err);
      });
    });
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {

      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const userInfoDb = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("/api/user", { email, password })
  //     .then((response) => {
  //       console.log(response.data)
  //     .catch((err) => {
  //       console.log(err);
  //       });
  //     });
  // };


  render() {
    if (this.state.redirect === true) {
      // If user is authenticated redirect to a diff page below
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form
          onSubmit={(event) => {
            this.signUpEmailPassword(event);
          }}
          ref={(form) => {
            this.loginForm = form;
          }}
        >
          <label className="">
            Email
            <input
              style={{ width: "100%" }}
              className=""
              name="email"
              type="email"
              ref={(input) => {
                this.emailInput = input;
              }}
              placeholder="Email"
            ></input>
          </label>
          <label className="">
            Password
            <input
              style={{ width: "100%" }}
              className=""
              name="password"
              type="password"
              ref={(input) => {
                this.passwordInput = input;
              }}
              placeholder="Password"
            ></input>
          </label>
          <input
            style={{ width: "100%" }}
            type="submit"
            className="button"
            value="Log In"
          ></input>
        </form>
      </div>
    );
  }
}

export default SignUp;
