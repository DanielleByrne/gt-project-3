import React, { Component } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import fire from "./config/Fire";
import SignUp from "./components/Signup"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  // componentDidMount() {
  //   this.removeAuthListener = fire.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({
  //         authenticated: true,
  //       });
  //     } else {
  //       this.setState({
  //         authenticated: false,
  //       });
  //     }
  //   });
  // };
  logout(){
    fire.auth().signOut();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        // setUser(user);
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    return (
      <div className="App">
        {/* <Home /> */}
        {this.state.user ? <Home /> : <Login />}
        <div>Here is the signup form</div>
        <SignUp />
        <Router>
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
          </Switch>
        </Router>
        <button onClick={this.logout}>Log Out</button>
      </div>
    );
  }
}

export default App;
