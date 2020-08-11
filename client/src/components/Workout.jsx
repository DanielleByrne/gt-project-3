import React, { Component } from "react";
import { Card, Button, Icon } from "antd";
import { FireTwoTone } from "@ant-design/icons";

class Workout extends Component {
  render() {
    return (
      <div>
        <Card style={{ width: 300, marginLeft: "40%" }}>
          <h1>Get after it!</h1>
          <Button type="primary" size="large" icon={<FireTwoTone twoToneColor="#f18f8e"/>} style={{backgroundColor: "pink", padding:"50px", borderRadius: "12px"}}>
            I worked out today!
          </Button>
          <p>
            Success isn’t always about greatness. It’s about consistency.
            Consistent hard work gains success. Greatness will come.{" "}
          </p>
        </Card>
      </div>
    );
  }
}

export default Workout;
