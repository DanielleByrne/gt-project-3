import React, { Component } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
import NoMatch from "./components/NoMatch";

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
  logout() {
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
        <Router>
          <Layout>
            <Header className="heading">
              <Link to ={"/"} className="title" >Healthy Competition</Link>
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
        {/* <Workout/> */}
      </div>
    );
  }
}

export default App;
