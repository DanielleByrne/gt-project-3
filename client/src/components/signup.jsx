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
  // fire.auth().signOut();

  // Sign up function
  signUpEmailPassword(event) {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {})
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
