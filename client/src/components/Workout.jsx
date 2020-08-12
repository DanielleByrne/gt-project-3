import React, { Component } from "react";
import { Card, Button, Icon } from "antd";
import { ThunderboltTwoTone } from "@ant-design/icons";
import { BookTwoTone } from "@ant-design/icons";
import { FundTwoTone } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

class Workout extends Component {
  constructor(props) {
    super(props);
    this.handleNoClick = this.handleNoClick.bind(this);
    this.handleYesClick = this.handleYesClick.bind(this);
    this.state = {
      redirectNo: false,
      redirectYes: false,
    };
  }

  handleNoClick() {
    console.log("No Clicked")
    this.setState({ redirectNo: true });
  }

  handleYesClick() {
    console.log("Yes Clicked")
    this.setState({ redirectYes: true });
  }

  render() {
    if (this.state.redirectNo === true) {
      // If user is authenticated redirect to a diff page below
      //this isn't working how i want it to be
      return <Redirect to="/profile" />;
    } else if (this.state.redirectYes === true) {
      return <Redirect to="/activeday" />;
    }
    return (
      <div>
        <Card style={{ width: 500, marginLeft: "32%", marginTop: "150px" }}>
          <h1>Is today an active day?</h1>
          <Button
            onClick={this.handleNoClick}
            type="primary"
            size="large"
            icon={<BookTwoTone twoToneColor="#f18f8e" />}
            style={{
              backgroundColor: "darksalmon",
              padding: "10px",
              borderRadius: "12px",
              margin: "20px",
              verticalAlign: "middle",
              textAlign: "center",
              display: "table-cell",
              width: "100px",
              height: "50px",
            }}
          >
            No
          </Button>
          <Button
            onClick={this.handleYesClick}
            type="primary"
            size="large"
            icon={<ThunderboltTwoTone twoToneColor="#f18f8e" />}
            style={{
              backgroundColor: "darksalmon",
              padding: "10px",
              borderRadius: "12px",
              verticalAlign: "middle",
              display: "table-cell",
              width: "100px",
              height: "50px",
            }}
          >
            Yes
          </Button>
          <p>
            Success isn’t always about greatness. It’s about consistency.
            Consistent hard work gains success. Greatness will come.{" "}
          </p>
          <Button
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
              marginLeft: "5%",
            }}
          >
            See how you stack up!
          </Button>
        </Card>
      </div>
    );
  }
}

export default Workout;
