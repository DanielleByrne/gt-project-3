import React, { Component } from "react";
// import { FireTwoTone } from "@ant-design/icons";
import { FundTwoTone } from "@ant-design/icons";
import { Card, Button, Icon } from "antd";
import ReactSpring from "./Animations/ReactSpring/ReactSpring"
import Axios from "axios";
import { Redirect } from "react-router-dom";

class ActiveDay extends Component {
  constructor(props) {
    super(props);
    this.handleStackUpButton = this.handleStackUpButton.bind(this);
    this.handleWorkedOutClick = this.handleWorkedOutClick.bind(this)
    this.state = {
      redirectTeam: false,
      redirectToProfile: false
    };
  }
  handleStackUpButton() {
    console.log("Stack Button Clicked");
    this.setState({ redirectTeam: true });
  }

  handleWorkedOutClick() {
    this.setState({redirectToProfile : true})
    const workoutID = localStorage.getItem("currentWorkout");
    Axios.put("/api/workoutUpdate", { params: { workoutID: workoutID } })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log("Workout Update Axios Error", err));
    }

  render() {
    if (this.state.redirectTeam === true) {
      return <Redirect to="/team" />;
    }
    if (this.state.redirectToProfile){
      return <Redirect to="profile"/>
    }
    return (
      <div>
        <Card style={{ width: 500, marginLeft: "32%", marginTop: "150px" }}>
          <h1>Get after it!</h1>
          {/* After click function complete --> */}
          <ReactSpring handleWorkedOutClick={this.handleWorkedOutClick}/>
          {/* <Button
            onClick={this.handleWorkedOutClick}
            type="primary"
            size="large"
            icon={<FireTwoTone twoToneColor="#ED6A5E" />}
            style={{
              backgroundColor: "darksalmon",
              padding: "20px",
              borderRadius: "12px",
              width: "300px",
              height: "100px",
              marginBottom: "20px",
              fontSize: "25px",
            }}
          >
            I worked out today!
          </Button> */}

          <p>
            Success isn’t always about greatness. It’s about consistency.
            Consistent hard work gains success. Greatness will come.{" "}
          </p>
          <Button
            onClick={this.handleStackUpButton}
            type="primary"
            size="large"
            icon={<FundTwoTone twoToneColor="#f18f8e" />}
            style={{
              backgroundColor: "darksalmon",
              // padding: "20px",
              borderRadius: "12px",
              width: "300px",
              height: "100px",
              fontSize: "25px",
            }}
          >
            See how you stack up!
          </Button>
        </Card>
      </div>
    );
  }
}

export default ActiveDay;
