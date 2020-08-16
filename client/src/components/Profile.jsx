import React, { useEffect, useState } from "react";
import { FundTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Card, Avatar, List, Row, Col, Button } from "antd";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const { Meta } = Card;

const styles = {
  card: {
    justifyContent: "center",
    // marginLeft: "30px",
    maxWidth: "300px",
    marginTop: "30px",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },

  list: {
    width: "50%",
    marginTop: "30px",
    // marginLeft: "25%",
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
      {/* THIS IS THE USER CARD */}
      <Row justify="center" align="middle">
        <Col xs={24} s={12} md={12} lg={12} xl={12}>
          <Row justify="center">
            <Card
              // style={{ width: 300 }}
              style={styles.card}
              cover={
                <img
                  alt="User"
                  src="https://www.dts.edu/wp-content/uploads/sites/6/2018/04/Blank-Profile-Picture.jpg"
                />
              }
            >
              <Meta
                //   avatar={
                //     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                //   }
                title={userInfo.email}
                description={"This is the description"}
              />
              <Button
                onClick={redirectTeam}
                type="primary"
                size="large"
                icon={<FundTwoTone twoToneColor="#ED6A5E" />}
                style={{
                  backgroundColor: "darksalmon",
                  // padding: "20px",
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
            </Card>
          </Row>
        </Col>
        {/* this is a list of their workouts  */}
        {/* Map over/input data from userInfo.workouts to get the cards to load below */}
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
              style={{
                backgroundColor: "white",
                paddingRight: "10px",
                paddingLeft: "10px",
                marginTop: "5px",
              }}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      // <a href="https://ant.design">
                      item.date_completed.split("T")[0]
                      /* </a> */
                    }
                    description={item.completed_workout === true ? "🔥" : "❌"}
                    avatar={
                      // <Avatar.group>
                      // <Avatar src="https://st2.depositphotos.com/1006689/9982/v/950/depositphotos_99827450-stock-illustration-biceps-flex-arm-vector-icon.jpg" />
                      <DeleteTwoTone
                        key={item._id}
                        onClick={() => {
                          handleDeleteWorkout(item._id);
                        }}
                      />
                      //item_id
                      /* </Avatar.group> */
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
