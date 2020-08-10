import React, { Component } from "react";
import fire from "../config/Fire";
import { Redirect, Link } from "react-router-dom";
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
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset();
          this.setState({ redirect: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

// Basic form included below. Email and password required.
  render() {
    if (this.state.redirect === true) {
      // If user is authenticated redirect to a diff page below
      return <Redirect to="/" />;
    }
    return (
      <div>
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
              style={{ width: "50%", margin: "10px", marginTop: "20px", border: " 1px solid #f18f8e" }}
              className=""
              name="email"
              type="email"
              ref={(input) => {
                this.emailInput = input;
              }}
              placeholder="Email"
            ></input>
          {/* </label> */}
          <br>
          </br>
          {/* <label className=""> */}
           
            <input
              style={{ width: "50%", margin: "10px" , border: " 1px solid #f18f8e" }}
              className=""
              name="password"
              type="password"
              ref={(input) => {
                this.passwordInput = input;
              }}
              placeholder="Password"
            ></input>
          {/* </label> */}
          <br>
          </br>
          <input
            style={{ margin: "10px" }}
            type="submit"
            className="button"
            value="Log In"
          ></input>
        </form>
      </div>
    );
  }
}

export default Login;
