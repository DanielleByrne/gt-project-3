import React from "react";
import "antd/dist/antd.css";
import { Input } from "antd";
import Axios from "axios";
const { Search } = Input;

const NewMessage = () => {
  function handleMessageSubmit(msg) {
    console.log("Send button clicked")
    const userEmail = localStorage.getItem("email");
    const data = {
      email: userEmail,
      message: msg,
    };
    console.log(data)
    Axios.post("/api/messages", data)
      .then((newMessage) => {
        console.log("Message posted");
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <div>
      <Search
        placeholder="Write your message here"
        enterButton="Send"
        size="large"
        style ={{width: "50%", justifyContent: "center"}}
        onSearch={(value) => handleMessageSubmit(value)}
      />
      ;
    </div>
  );
};

export default NewMessage;
