import React, { Component } from "react";
import { Card, Button, Icon } from "antd";
import { FireTwoTone } from "@ant-design/icons";
import { ThunderboltTwoTone } from "@ant-design/icons";
import { BookTwoTone } from "@ant-design/icons";
import { FundTwoTone } from "@ant-design/icons";

class Workout extends Component {
  render() {
    return (
      <div>
        <Card style={{ width: 300, marginLeft: "39%" }}>
          <h1>Is today a rest day?</h1>
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
            Yes
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<ThunderboltTwoTone twoToneColor="#f18f8e" />}
            style={{
              backgroundColor: "pink",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            No
          </Button>
          <p>
            Success isn’t always about greatness. It’s about consistency.
            Consistent hard work gains success. Greatness will come.{" "}
          </p>
        </Card>
        <Card style={{ width: 300, marginLeft: "39%" }}>
          <h1>Get after it!</h1>
          <Button
            type="primary"
            size="large"
            icon={<FireTwoTone twoToneColor="#f18f8e" />}
            style={{
              backgroundColor: "pink",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            I worked out today!
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
