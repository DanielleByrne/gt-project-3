import React, { useEffect } from "react";
import Axios from "axios";
import { Card } from "antd";

function Messages() {
  const [Messages, setMessages] = useState([]);

  useEffect(() => {
    Axios.get("/api/messages").then((res) => {
      setMessages(res);
    });
  });

  return (
    <div>
      {Messages.map((message) => (
        <Card>
          <div>{message.message}</div>
          <small>{message.time_posted}</small>
        </Card>
      ))}
    </div>
  );
}

export default Messages;
