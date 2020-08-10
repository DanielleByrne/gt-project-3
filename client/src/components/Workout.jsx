import React, { Component } from "react";
import { Card, Button, Icon } from "antd";
import { FireTwoTone } from "@ant-design/icons";

class Workout extends Component {
  render() {
    return (
      <div>
        <Card title="Get after it!" style={{ width: 300, marginLeft: "39%" }}>
          <Button type="primary" size="large" icon={<FireTwoTone twoToneColor="#f18f8e"/>} style={{backgroundColor: "pink", paddingBottom:"45px",borderRadius: "12px", fontSize:"25px"}}>
            {/* position 9 makes it centered in the inspector, can't get it working in the code  */}
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
