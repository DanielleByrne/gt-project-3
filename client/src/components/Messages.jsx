import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "antd";
import "antd/dist/antd.css";
import { Input} from "antd";
const { Search } = Input;

function Messages() {
  const [messagesArr, setMessagesArr] = useState([]);

  useEffect(() => {
    Axios.get("/api/messages").then((res) => {
      console.log(res.data.data);
      setMessagesArr(res.data.data);
    });
  }, []);
  // ISSUES WITH THIS: I THINK IT WOULD ONLY UPDATE IF YOU ARE THE PERSON CHATTING.
  // REFRESH MAY NEED TO BE DONE IN REAL TIME TO GET OTHER PEOPLES MESSAGES
  // MAYBE USE CRON HERE?
  function handleMessageSubmit(msg) {
    console.log("Send button clicked");
    const userEmail = localStorage.getItem("email");
    const data = {
      email: userEmail,
      message: msg,
    };
    console.log(data);
    Axios.post("/api/messages", data)
      .then((newMessage) => {
        console.log("Message posted");
      })
      .catch((err) => {
        throw err;
      });
    Axios.get("/api/messages").then((res) => {
      setMessagesArr(res.data.data);
    });
  }



  return (
    <div>
      <h4>Chat With Your Team</h4>
      <Search
        placeholder="Write your message here"
        enterButton="Send"
        size="large"
        style={{ width: "50%" }}
        onSearch={(value) => handleMessageSubmit(value)}
      />
      <div scroll={{ y: 240 }}>
        <div className="scrollable">
          {messagesArr.map((message) => (
            <Card
              // scroll={{y:240}}
              style={{ width: "50%", marginLeft: "25%", marginTop: "20px" }}
            >
              <div>
                {message.email} <br />
              </div>
              <div>{message.message}</div>
              <small>
                <small>
                  at {message.time_posted.split("T")[1].slice(0, 5)} on{" "}
                  {message.time_posted.split("T")[0]}
                </small>
              </small>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messages;
