import React, { Component } from "react";
import fbApp from "../base";
import { Redirect } from "react-router-dom";
import { app } from "firebase";

class login extends Component {
  constructor(props) {
    super(props);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.state = {
      redirect: false,
    };
  }
  authWithEmailPassword(event) {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    fbApp
      .auth()
      .fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          return fbApp.auth().createUserWithEmailAndPassword(email, password);
          // Create User
        } else if (providers.indexOf("password") === -1) {
          // FB login used
        } else {
          return app.auth().signInWithEmailAndPassword(email, password);
          // sign user in
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset();
          this.setState({ redirect: true });
        }
      })
      .catch((error) => {
        throw error;
      });
  }
  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <form
          onSubmit={(event) => {
            this.authWithEmailPassword(event);
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

export default login;
