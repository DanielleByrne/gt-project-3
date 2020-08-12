import React, { Component } from "react";
import { Table } from "antd";
import { useSpring, animated } from "react-spring";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Consecutive Workouts",
    dataIndex: "consecutive",
  },
  {
    title: "Today's Workout",
    dataIndex: "today",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

const styles = {
  table: {
    marginTop: "45px",
<<<<<<< HEAD
    width: "75%",
    marginLeft: "15%",
=======
    width: "50%",
    marginLeft: "30px"
>>>>>>> d4e40567977ac839d19b77abf575ce449d30ff0f
  },
};

function App() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return <animated.div style={props}>How's Your Team Doing?</animated.div>;
}

class TeamView extends Component {
  render() {
    return (
      <div style={styles.table}>
        <App></App>
        <Table columns={columns} dataSource={data} size="middle" />
      </div>
    );
  }
}

export default TeamView;
