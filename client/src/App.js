import React, { Component } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import Workout from "./components/Workout";
import fire from "./config/Fire";
import {Layout} from "antd";
import "./App.css"
// import Home from "./components/Home";
// import Login from "./components/Login";
// import fire from "./config/Fire";
import SignUp from "./components/signup"

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
    const { Header } = Layout; 
    return (
      <div className="App">
        <Layout>
          <Header className = "heading">
            <h1 className = "title">
              Healthy Competition
            </h1>
          </Header>
        </Layout>
        {/* <Login /> */}
        {/* {this.state.user ? <Home /> : <Login />} */}
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/workout" component={Workout}/>
          </Switch>
        </Router>
        <button onClick={this.logout}>Log Out</button>
        {/* <Workout/> */}
      </div>
    );
  }
}

export default App;
