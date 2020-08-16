import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { BookTwoTone } from '@ant-design/icons';
import '../Workout';

const Nobutton = props => {
  const [state, toggle] = useState(true);
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 }
  });

  const handleClick = () => {
    toggle(!state);
    setTimeout(() => {
      props.handleNoClick();
    }, 2000);
  };

  return (
    <div>
      <animated.button
        onClick={handleClick}
        type="primary"
        size="large"
        icon={<BookTwoTone twoToneColor="#f18f8e" />}
        style={{
          backgroundColor: 'darksalmon',
          padding: '10px',
          borderRadius: '12px',
          margin: '20px',
          verticalAlign: 'middle',
          textAlign: 'center',
          display: 'table-cell',
          border: "1px solid #1890ff",
          width: '100px',
          height: '50px',
          color: 'white',
          opacity: x.interpolate({ range: [0, 1], output: [0.3, 1] }),
          transform: x
            .interpolate({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
            })
            .interpolate(x => `scale(${x})`)
        }}
      >
        No
      </animated.button>
    </div>
  );
};

export default Nobutton;
