import React, { Component } from "react";
import { FireTwoTone } from "@ant-design/icons";
import { FundTwoTone } from "@ant-design/icons";
import { Card, Button, Icon } from "antd";
import { Redirect } from "react-router-dom";


class ActiveDay extends Component {
  constructor(props) {
    super(props);
    this.handleStackUpButton = this.handleStackUpButton.bind(this);
    this.state = {
      redirectTeam: false,
    };
  }
  handleStackUpButton() {
    console.log("Stack Button Clicked");
    this.setState({ redirectTeam: true });
  }

  handleWorkedOutClick(){
    
  }

  render() {
    if (this.state.redirectTeam === true) {
      return <Redirect to="/team" />;
    }
    return (
      <div>
        <Card style={{ width: 500, marginLeft: "32%", marginTop: "150px" }}>
          <h1>Get after it!</h1>
          <Button
            type="primary"
            size="large"
            icon={<FireTwoTone twoToneColor="#f18f8e" />}
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
          </Button>

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
