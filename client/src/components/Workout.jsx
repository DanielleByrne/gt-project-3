import React, { Component } from "react";
import { Card, Button, Icon } from "antd";
import { ThunderboltTwoTone } from "@ant-design/icons";
import { BookTwoTone } from "@ant-design/icons";
import { FundTwoTone } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

class Workout extends Component {

  render() {

    handleRedirect = () => {
      return <Redirect to="/activeday" />;
    };
    return (
      <div>
        <Card style={{ width: 300, marginLeft: "39%" }}>
          <h1>Is today an active day?</h1>
          <Button
            type="primary"
            size="large"
            icon={<BookTwoTone twoToneColor="#f18f8e" />}
            style={{
              backgroundColor: "pink",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            No
          </Button>
          <Button
            onClick={handleRedirect}
            type="primary"
            size="large"
            icon={<ThunderboltTwoTone twoToneColor="#f18f8e" />}
            style={{
              backgroundColor: "pink",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            Yes
          </Button>
          <p>
            Success isn’t always about greatness. It’s about consistency.
            Consistent hard work gains success. Greatness will come.{" "}
          </p>
        </Card>

        <Button
          type="primary"
          size="large"
          icon={<FundTwoTone twoToneColor="#f18f8e" />}
          style={{
            backgroundColor: "pink",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          See how you stack up!
        </Button>
      </div>
    );
  }
}

export default Workout;
