import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import { ReactComponent as Strongicon } from "./strong.svg";
import { ReactComponent as Clock } from "./clock.svg";
import "./ReactSpring.css";

const ReactSpring = (props) => {
  const [toggle, set] = useState(false);
  const transitions = useTransition(toggle, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });


  const handleClickTwo = () => {
    set(!toggle);
    setTimeout(() => {
      props.handleWorkedOutClick();
    }, 1500);
  };

  return (
    <div>
      <button
        type="primary"
        size="large"
        style={{
          backgroundColor: "darksalmon",
          padding: "20px",
          borderRadius: "12px",
          width: "300px",
          height: "100px",
          marginBottom: "20px",
          fontSize: "25px",
        }}
        onClick={handleClickTwo}
      >
        {" "}
        {transitions.map(({ item, key, props }) =>
          item ? (
            <animated.div style={props}>
              <Strongicon />
            </animated.div>
          ) : (
            <animated.div style={props}>
              <Clock />
            </animated.div>
          )
        )}
        <p id="buttonText">Workout complete!</p>
      </button>
    </div>
  );
};

export default ReactSpring;
