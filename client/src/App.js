import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./container/Home/Home"; 
import Login from "./components/login"
import fbApp from '../base'
function App() {

  componentWillMount() {
    this.removeAuthListener = fbApp.auth().onAuthStateChanged((user)=>{
      if (user){
        this.setState({
          authenticated: true,
        })
      }else{
        this.setState({
          authenticated:false
        })
      }
    })
  }
  useEffect(() => {
    axios
      .get("/api/config")
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      <Login />
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
