import React, { useEffect, useState } from "react";
import { Table } from "antd";
// import { useSpring, animated } from "react-spring";
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
    {
      title: "Consecutive Workouts",
      dataIndex: "consecutive",
    },
    {
      title: "Today's Workout",
      dataIndex: "completed_today",
    },
  ];

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
            res.data[i].completed_today = "WORKOUT COMPLETED";
          } else {
            res.data[i].completed_today = "WORKOUT NOT DONE";
          }
          res.data[i].key=res.data[i]._id
          // Consecutive workout section
          // initialize counter to 0 at each user(already done on line )=>add one to counter create new date in for loop below, subtract counter. Check against
          // workout at index j (res.data[i].workouts[j]). If that is true and completed_workout is true, add one to a consecutive days counter.
          // If either are false, exit the for loop, add the consecutive days counter to the res.body object. 
          // Add new column in column array above for consecutive days
          //**Where is completed_workout coming from? if so, is it defined? */
          let counter=0
          let consecutiveDays=0
          // For loop steps through mongodb database in reverse order since the most recent workouts are the last entries in the db.
          for (let j=res.data[i].workouts.length-1;j>0;--j){
            //check workout at index j against 
            //JD: ***if workout at index j (compares against counter?) and completed workout is true then... */
            console.log("workouts of j", res.data[i].workouts[j])
            console.log(res.data[i].workouts[j].date_completed.split("T")[0] === todaySetter - counter);
            console.log("Stepping back in days" , todaySetter-counter)
            if(res.data[i].workouts[j].date_completed.split("T")[0] === todaySetter - counter && res.data[i].workouts[j].completed_workout === true){
              //****JD: Increment consecutiveDays */
              counter ++
              consecutiveDays = consecutiveDays++
             
              // console.log(consecutiveDays);
            }
          }
        }
        setAllUsers(res.data);
      })
      .catch((err) => console.log("usersErr", err));
  }, []);
// CONSECUTIVE DAYS PSEUDOCODE
// Step through workouts in reverse order, if the days actually step backwards
// and the completed workout is true, add one to a counter until conditional is false
  


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
