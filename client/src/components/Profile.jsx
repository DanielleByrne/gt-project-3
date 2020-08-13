import React, { useEffect, useState } from "react";
import { FundTwoTone } from "@ant-design/icons";
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
    // marginLeft: "45%",
  },
};

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [redirect, setRedirect] = useState(false)
    let workoutArr;

  const userID = localStorage.getItem("userID");
  useEffect(() => {
    Axios.post("/api/userProfile", {
      params: {
        id: userID,
      },
    }).then((res) => {
      workoutArr = res.data.workouts;
      workoutArr = [...workoutArr].reverse();
      res.data.workouts = workoutArr;
      setUserInfo(res.data);
    });
  }, []);

  const redirectTeam=()=>{
    setRedirect(true)
  }
  if(redirect === true){
    return <Redirect to="/team"/>
  }


  return (
    <div>
      {/* THIS IS THE USER CARD */}
      <Row>
        <Col span={12}>
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
          </Card>
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
              marginRight:"7%"
            }}
          >
            Back to team page
          </Button>
        </Col>
        {/* this is a list of their workouts  */}
        {/* Map over/input data from userInfo.workouts to get the cards to load below */}
        <Col span={12}>
          <List
            style={styles.list}
            itemLayout="horizontal"
            dataSource={userInfo.workouts}
            pagination={{pageSize: 7, 
              // position:"top"
            }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  // avatar={
                  //   <Avatar src="https://st2.depositphotos.com/1006689/9982/v/950/depositphotos_99827450-stock-illustration-biceps-flex-arm-vector-icon.jpg" />
                  // }
                  title={
                    // <a href="https://ant.design">
                      item.date_completed.split("T")[0]
                    /* </a> */
                  }
                  description={
                    item.completed_workout === true
                      ? "🔥"
                      : "❌"
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
