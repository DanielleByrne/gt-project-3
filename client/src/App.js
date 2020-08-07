import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./container/Home/Home"; 

function App() {
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
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
