import React, { useEffect, useState } from "react";
import { FundTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Card, List, Row, Col, Button } from "antd";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const { Meta } = Card;

const styles = {
  card: {
    justifyContent: "center",
    maxWidth: "300px",
    marginTop: "30px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },

  list: {
    width: "50%",
    marginTop: "30px",
  },

  button: {
    backgroundColor: "darksalmon",
    borderRadius: "12px",
    width: "250px",
    height: "75px",
    fontSize: "18px",
    marginTop: "15px",
    marginRight: "39%",
  },
};

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [markComplete, setMarkComplete] = useState(false);

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

  const redirectToActive = () => {
    setMarkComplete(true);
  };
  if (markComplete === true) {
    return <Redirect to="/activeday" />;
  }
  const handleDeleteWorkout = (workoutId) => {
    console.log(workoutId);
    var deleteConfirmation = window.confirm(
      "Are you sure you'd like to delete this workout?"
    );
    if (deleteConfirmation) {
      Axios.delete(`/api/workout`, { data: { _id: workoutId } })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Row justify="center" align="middle">
        <Col xs={24} s={12} md={12} lg={12} xl={12}>
          <Row justify="center">
            <Card
              style={styles.card}
              cover={
                <img
                  alt="User"
                  src="https://www.dts.edu/wp-content/uploads/sites/6/2018/04/Blank-Profile-Picture.jpg"
                />
              }
            >
              <Meta title={userInfo.email} />
              <Button
                onClick={redirectTeam}
                type="primary"
                size="large"
                icon={<FundTwoTone twoToneColor="#ED6A5E" />}
                style={styles.button}
              >
                Back to team page
              </Button>
              <Button
                onClick={redirectToActive}
                type="primary"
                size="large"
                style={styles.button}
              >
                Complete Today's Workout
              </Button>
            </Card>
          </Row>
        </Col>
        <Col id="workoutList" xs={24} s={12} md={12} lg={12} xl={12}>
          <Row justify="center">
            <List
              header={<div style={{ fontSize: "24px" }}>Your Stats</div>}
              style={styles.list}
              itemLayout="horizontal"
              dataSource={userInfo.workouts}
              pagination={{
                pageSize: 7,
                position: "top",
              }}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.date_completed.split("T")[0]}
                    description={item.completed_workout === true ? "🔥" : "❌"}
                    avatar={
                      <DeleteTwoTone
                        key={item._id}
                        onClick={() => {
                          handleDeleteWorkout(item._id);
                        }}
                      />
                    }
                  />
                </List.Item>
              )}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
