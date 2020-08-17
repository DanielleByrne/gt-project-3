import React, { Component } from "react";
import { FundTwoTone } from "@ant-design/icons";
import {Button, Row, Col } from "antd";
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
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className="gutter-row" span={24}>
          <h1 style={{marginTop:"50px"}}>Get after it!</h1>
          <ReactSpring handleWorkedOutClick={this.handleWorkedOutClick}/>
       
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
              borderRadius: "12px",
              width: "300px",
              height: "100px",
              fontSize: "25px",
            }}
          >
            See how you stack up!
          </Button>
        </Col>
        </Row>
      </div>
    );
  }
}

export default ActiveDay;
