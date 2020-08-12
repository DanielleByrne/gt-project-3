import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";
import { BookTwoTone } from "@ant-design/icons";
import "../Workout";

const Clicktest = () => {
  const [state, toggle] = useState(true);
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
  });

  return (
    <div state={state} toggle={toggle}>
      <animated.button
        // onClick={this.handleNoClick}
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
          color: "white",
          opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
          transform: x
            .interpolate({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            })
            .interpolate((x) => `scale(${x})`),
        }}
      >
        Yes
      </animated.button>
    </div>
  );
};

export default Clicktest;
/*
0 % { transform: scale(1); }
25 % { transform: scale(.97); }
35 % { transform: scale(.9); }
45 % { transform: scale(1.1); }
55 % { transform: scale(.9); }
65 % { transform: scale(1.1); }
75 % { transform: scale(1.03); }
100 % { transform: scale(1); }
`*/
