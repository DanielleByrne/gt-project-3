import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "antd";

function Messages() {
  const [messagesArr, setMessagesArr] = useState([]);

  useEffect(() => {
    console.log("Loading Messages (GET ROUTE)")
    Axios.get("/api/messages").then((res) => {
      console.log(res.data.data)
      setMessagesArr(res.data.data);

    });
  },[]);

  return (
    <div>
      {messagesArr.map((message) => (
        <Card>
          <div>{message.email}</div>
          <div>{message.message}</div>
          <small>{message.time_posted}</small>
        </Card>
      ))}
    </div>
  );
}

export default Messages;
