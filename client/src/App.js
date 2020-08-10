import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./container/Home/Home";
import Login from "./components/login";
import fire from "./config/Fire";

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
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }

  componentDidMount() {
    this.authListener();
  }
  render() {
    return;
    <div className="App">
      {/* If user is logged in send to Home, if not send to login (change with correct links) */}
      {this.state.user ? <Home /> : <Login />}
      <Login />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>;
  }
}

export default App;
