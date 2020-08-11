import React, { Component } from "react";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import Workout from "./components/Workout";
import fire from "./config/Fire";
import { Layout } from "antd";
import "./App.css";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import fire from "./config/Fire";
import SignUp from "./components/signup";
import { Button, Icon } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Profile from "./components/Profile";
import TeamView from "./components/TeamView";
import ActiveDay from "./components/ActiveDay";

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      user: {},
      logoutRedirect: false,
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
  logout() {
    fire.auth().signOut();
    localStorage.clear();
    this.setState({ logoutRedirect: true });
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        const emailPrefix = user.email.split("@");
        localStorage.setItem("email", emailPrefix[0]);
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
    if (this.state.logoutRedirect == true) {
      this.setState({ logoutRedirect: false });
      return (
        <Router>
          <Redirect to="/" />
        </Router>
      );
    }
    if (this.state.user) {
      return (
        <div className="App">
          <Router>
            <Layout>
              <Header className="heading">
                <h1 className="title">Healthy Competition</h1>

                <Button
                  icon={<LogoutOutlined />}
                  style={{
                    marginLeft: "90%",
                    backgroundColor: "coral",
                    marginBottom: "20%",
                    color: "white",
                  }}
                  onClick={this.logout}
                >
                  Log Out
                </Button>
              </Header>
            </Layout>

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/workout" component={Workout} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/team" component={TeamView} />
              <Route exact path="/activeday" component={ActiveDay} />
            </Switch>
          </Router>
        </div>
      );
    }
    return (
      <div className="App">
        <Router>
          <Layout>
            <Header className="heading">
              <h1 className="title">Healthy Competition</h1>
            </Header>
          </Layout>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
