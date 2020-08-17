import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Workout from "./components/Workout";
import fire from "./config/Fire";
import "./App.css";
import SignUp from "./components/signup";
import { Button, PageHeader } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Profile from "./components/Profile";
import TeamView from "./components/TeamView";
import ActiveDay from "./components/ActiveDay";
import { UserOutlined } from "@ant-design/icons";
import NoMatch from "./components/NoMatch";


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
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    if (this.state.profileRedirect) {
      this.setState({ profileRedirect: false });
      console.log("You are going to be redirected.");
      return (
        <Router>
          <Redirect to="/profile" />
        </Router>
      );
    }
    if (this.state.logoutRedirect === true) {
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
            <div className="site-page-header-ghost-wrapper">
              <PageHeader
                style={{ backgroundColor: "darksalmon", color: "white" }}
                extra={[
                  <Button
                    icon={<UserOutlined />}
                    onClick={this.handleProfileClick}
                  >
                    Profile
                  </Button>,
                  <Button icon={<LogoutOutlined />} onClick={this.logout}>
                    Log Out
                  </Button>,
                ]}
              >
                <Link to={"/"} className="title" style={{ fontSize: "36px" }}>
                  Healthy Competition
                </Link>
              </PageHeader>
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/workout" component={Workout} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/team" component={TeamView} />
              <Route exact path="/activeday" component={ActiveDay} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </div>
      );
    }
    return (
      <div className="App">
        <Router>
          <div className="site-page-header-ghost-wrapper">
            <PageHeader style={{ backgroundColor: "darksalmon" }}>
              <Link to={"/"} className="title" style={{ fontSize: "36px" }}>
                Healthy Competition
              </Link>
            </PageHeader>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/workout" component={Workout} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/team" component={TeamView} />
            <Route exact path="/activeday" component={ActiveDay} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
