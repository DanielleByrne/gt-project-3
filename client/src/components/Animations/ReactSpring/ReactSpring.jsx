import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import { ReactComponent as Strongicon } from "./strong.svg";
import { ReactComponent as Clock } from "./clock.svg";

const ReactSpring = props => {
  const [toggle, handleClick] = useState(false);
  const transitions = useTransition(toggle, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });


  // added from Yesbutton code as ref
  //name click function on ActiveDay.jsx handleWorkoutClick
  // const handleClick = () => {
  //   toggle(!state);
  //   setTimeout(() => {
  //     props.handleWorkoutClick();
  //   }, 2000);
  // };


  return (
    <>
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
        // {set} --> {handleClick} (if you change to set, change handleClick
        // in [toggle, handleClick] needs to change too.)
        onClick={handleClick}
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
        Workout complete!
      </button>
    </>
  );
};

export default ReactSpring;
