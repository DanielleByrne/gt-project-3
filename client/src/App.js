import React, { Component } from "react";
// import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
// import Login from "./components/login";
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
import { UserOutlined } from "@ant-design/icons";
import NoMatch from "./components/NoMatch";
import ReactSpring from "./components/Animations/ReactSpring/ReactSpring";

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.state = {
      user: {},
      logoutRedirect: false,
      profileRedirect: false,
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
  handleProfileClick() {
    console.log("Profile button clicked");
    this.setState({ profileRedirect: true });
  }

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
    if (this.state.profileRedirect) {
      this.setState({ profileRedirect: false });
      console.log("You are going to be redirected.");
      return (
        <Router>
          <Redirect to="/profile" />
        </Router>
      );
    }
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
                <Link to="/" className="title">
                  Healthy Competition
                </Link>
                <Button
                  icon={<LogoutOutlined />}
                  style={{
                    backgroundColor: "lightsteelblue",
                    marginTop: "15px",
                    color: "white",
                    float: "right",
                  }}
                  onClick={this.logout}
                >
                  Log Out
                </Button>
                <Button
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: "darksalmon",
                    color: "white",
                    float: "right",
                    marginTop: "15px",
                  }}
                  onClick={this.handleProfileClick}
                >
                  Profile
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
              <Route component= {NoMatch}/>
              <Route exact path = "/testspring" component = {ReactSpring}/>
              {/* render= if lift state */}
              {/* <Route exact path = "/clicktest" component = {Clicktest}/> */}
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
              <Link to={"/"} className="title">
                Healthy Competition
              </Link>
              {this.state.user ? (
                <Button
                  icon={<LogoutOutlined />}
                  style={{
                    marginLeft: "90%",
                    backgroundColor: "lightsteelblue",
                    marginBottom: "20%",
                    color: "white",
                  }}
                  onClick={this.logout}
                >
                  Log Out
                </Button>
              ) : null}
            </Header>
          </Layout>
          {/* <Login /> */}
          {/* {this.state.user ? <Home /> : <Login />} */}

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/workout" component={Workout} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/team" component={TeamView} />
            <Route exact path="/activeday" component={ActiveDay} />
            <Route component= {NoMatch}/>

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
