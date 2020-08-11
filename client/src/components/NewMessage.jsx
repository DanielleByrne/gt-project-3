import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Input } from "antd";
import Axios from "axios";
const { Search } = Input;

const NewMessage = () => {
  function handleMessageSubmit(msg) {
    const userEmail = localStorage.getItem("email");
    const data = {
      email: userEmail,
      message: msg,
    };
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
        placeholder="input search text"
        enterButton="Send"
        size="large"
        onSearch={(value) => handleMessageSubmit(value)}
      />
      ;
    </div>
  );
};

export default NewMessage;
