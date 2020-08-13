import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useSpring, animated } from "react-spring";
import Messages from "./Messages";
import Axios from "axios";
import date from "date-and-time";
function TeamView() {
  const [allUsers, setAllUsers] = useState([]);

  const styles = {
    table: {
      marginTop: "45px",
      width: "75%",
      marginLeft: "15%",
    },
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "email",
    },
    // {
    //   title: "Consecutive Workouts",
    //   dataIndex: "consecutive",
    // },
    {
      title: "Today's Workout",
      dataIndex: "completed_today",
    },
  ];

function App() {
  // const [teamInfo, setTeamInfo] = useState({});


  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return <animated.div style={props}>How's Your Team Doing?</animated.div>;
}
  useEffect(() => {
    let todaySetter = new Date();
    todaySetter = date.format(todaySetter, "YYYY-MM-DD").trim();

    console.log("GETTING USERS");
    Axios.get("/api/user")
      .then((res) => {
        console.log("res.data", res.data);

        for (let i = 0; i < res.data.length; i++) {
          if (
            res.data[i].workouts.length > 0 &&
            res.data[i].workouts[
              res.data[i].workouts.length - 1
            ].date_completed.split("T")[0] === todaySetter &&
            res.data[i].workouts[res.data[i].workouts.length - 1]
              .completed_workout === true
          ) {
            res.data[i].completed_today = "🔥";
          } else {
            res.data[i].completed_today = "❌";
          }
        }
        setAllUsers(res.data);
      })
      .catch((err) => console.log("usersErr", err));
  }, []);

  // const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  // return <animated.div style={props}>How's Your Team Doing?</animated.div>;

  return (
    <div>
      <div style={styles.table}>
        <Table
          columns={columns}
          dataSource={allUsers}
          size="middle"
          // scroll={{ y: 240 }}
          pagination={{ pageSize: 5 }}
        />
      </div>
      <Messages />
      {/* <NewMessage /> */}
    </div>
  );
}

export default TeamView;
