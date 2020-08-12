import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "antd";
import "antd/dist/antd.css";
import { Input } from "antd";
const { Search } = Input;

function Messages() {
  const [messagesArr, setMessagesArr] = useState([]);

  useEffect(() => {
    console.log("Loading Messages (GET ROUTE)");
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
      console.log(res.data.data);
      setMessagesArr(res.data.data);
    });
  }

  return (
    <div>
      <h3>Chat With Your Team</h3>
      <Search
        placeholder="Write your message here"
        enterButton="Send"
        size="large"
        onSearch={(value) => handleMessageSubmit(value)}
      />

      {messagesArr.map((message) => (
        <Card>
          <div>{message.email}</div>
          <div>{message.message}</div>
          <small>{message.time_posted.split("T")[0]}</small>
          <br />
          <small>{message.time_posted.split("T")[1].slice(0, 5)}</small>
        </Card>
      ))}
    </div>
  );
}

export default Messages;
