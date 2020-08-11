import React, { Component } from "react";
import { Table } from "antd";

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
    width: "50%",
    marginLeft: "30px"
  },
};

class TeamView extends Component {
  render() {
    return (
      <div style={styles.table}>
        <h4>How's Your Team Doing?</h4>
        <Table columns={columns} dataSource={data} size="middle" />
      </div>
    );
  }
}

export default TeamView;
