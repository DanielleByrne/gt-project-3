import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import {ReactComponent as Strongicon} from "./strong.svg"
import {ReactComponent as Clock} from "./clock.svg"

const ReactSpring = () => {
  const [toggle, set] = useState(false);
  const transitions = useTransition(toggle, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <>
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div style={props}><Strongicon/></animated.div>
        ) : (
          <animated.div style={props}><Clock/></animated.div>
        )
      )}
      <button onClick={set}>Workout complete!</button>
    </>
  );
};

export default ReactSpring;
