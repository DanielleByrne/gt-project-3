import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Input } from "antd";
import axios from 'axios'
const { Search } = Input;

const NewMessage = () => {



  function handleMessageSubmit(message) {
    Axios.post()
  }

  return <div>

<Search
      placeholder="input search text"
      enterButton="Send"
      size="large"
      onSearch={(value) => handleMessageSubmit(value)}
    />;
  </div>;
};

export default NewMessage;
