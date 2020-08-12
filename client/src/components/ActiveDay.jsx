import React, { Component } from "react";
import { FireTwoTone } from "@ant-design/icons";
import { Card, Button, Icon } from "antd";



class ActiveDay extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default ActiveDay;
