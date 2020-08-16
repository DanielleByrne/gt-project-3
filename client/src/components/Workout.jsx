import React, { Component } from "react";
import {Button, Row, Col } from "antd";
import { FundTwoTone } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import Yesbutton from "./Animations/Yesbutton";
import Nobutton from "./Animations/Nobutton";

class Workout extends Component {
  constructor(props) {
    super(props);
    this.handleNoClick = this.handleNoClick.bind(this);
    this.handleYesClick = this.handleYesClick.bind(this);
    this.handleStackUpButton = this.handleStackUpButton.bind(this);
    this.state = {
      redirectNo: false,
      redirectYes: false,
      redirectTeam: false,
    };
  }

  handleNoClick() {
    console.log("No Clicked");
    this.setState({ redirectNo: true });
  }

  handleYesClick() {
    console.log("Yes Clicked");
    console.log(localStorage.getItem("userID"));
    this.setState({ redirectYes: true });
    const userID = localStorage.getItem("userID");
    Axios.post("/api/workout", {
      params: {
        userID: userID,
      },
    })
      .then((res) => {
        console.log("Axios Complete", res);
        if (res.data._id) {
          localStorage.setItem("currentWorkout", res.data._id);
        }
      })
      .catch((err) => console.log("Axios route error", err));
  }

  handleStackUpButton() {
    console.log("Stack Button Clicked");
    this.setState({ redirectTeam: true });
  }

  render() {
    if (this.state.redirectNo === true) {
      return <Redirect to="/profile" />;
    } else if (this.state.redirectYes === true) {
      return <Redirect to="/activeday" />;
    }

    if (this.state.redirectTeam === true) {
      return <Redirect to="/team" />;
    }
    return (
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={24}>
            <h1 style={{ marginTop: "50px" }}>Is today an active day?</h1>
            <Row justify="center">
            <Yesbutton handleYesClick={this.handleYesClick} />
            <Nobutton handleNoClick={this.handleNoClick} />
            </Row>
            <aside>
              <p style={{fontSize:"15px", marginBottom:"0px"}}>Success isn’t always about greatness. </p>
              <p style={{fontSize:"15px", marginBottom:"0px"}}>It’s about consistency.</p>
              <p style={{fontSize:"15px", marginBottom:"0px"}}>Consistent hard work gains success. </p>
              <p style={{fontSize:"15px", marginBottom:"0px"}}>Greatness will come.</p>
            </aside>
            <Button
              onClick={this.handleStackUpButton}
              type="primary"
              size="large"
              icon={<FundTwoTone twoToneColor="#ED6A5E" />}
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

export default Workout;
