import React, { useEffect, useState } from "react";
import { FundTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Card, Avatar, List, Row, Col, Button } from "antd";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const { Meta } = Card;

const styles = {
  card: {
    justifyContent: "center",
    marginLeft: "10%",
    marginTop: "30px",
    width: "300px",
  },

  list: {
    width: "50%",
    marginTop: "30px",
  },
};

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [redirect, setRedirect] = useState(false);

  const userID = localStorage.getItem("userID");
  useEffect(() => {
    Axios.post("/api/userProfile", {
      params: {
        id: userID,
      },
    }).then((res) => {
      let workoutArr;
      workoutArr = res.data.workouts;
      workoutArr = [...workoutArr].reverse();
      res.data.workouts = workoutArr;
      setUserInfo(res.data);
    });
  });

  const redirectTeam = () => {
    setRedirect(true);
  };
  if (redirect === true) {
    return <Redirect to="/team" />;
  }

  const handleDeleteWorkout= (workoutId) => {
    console.log(workoutId);
    Axios
      .delete(`/api/workout`, {data: { _id: workoutId}})
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
      <Row>
        <Col span={12}>
          <Card
            style={styles.card}
            cover={
              <img
                alt="User"
                src="https://www.dts.edu/wp-content/uploads/sites/6/2018/04/Blank-Profile-Picture.jpg"
              />
            }
          >
            <Meta
              title={userInfo.email}
              description={"This is the description"}
            />
          </Card>
          <Button
            onClick={redirectTeam}
            type="primary"
            size="large"
            icon={<FundTwoTone twoToneColor="#ED6A5E" />}
            style={{
              backgroundColor: "darksalmon",
              borderRadius: "12px",
              width: "250px",
              height: "75px",
              fontSize: "18px",
              marginTop: "15px",
              marginRight: "39%",
            }}
          >
            Back to team page
          </Button>
        </Col>
        <Col span={12}>
          <List
            style={styles.list}
            itemLayout="horizontal"
            dataSource={userInfo.workouts}
            pagination={{pageSize: 7, 
            }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                      item.date_completed.split("T")[0]
                  }
                  description={
                    item.completed_workout === true
                      ? "🔥"
                      : "❌"
                  }
                  avatar={
                    <DeleteTwoTone
                    key={item._id}
                    onClick= {()=>{handleDeleteWorkout(item._id)}}
                     />
                  }
                  />
              </List.Item>
            )}
            
          />
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
