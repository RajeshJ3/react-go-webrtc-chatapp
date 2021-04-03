import { useEffect, useState } from "react";
import CustomAppBar from "../components/appbar/AppBar";
import InputBar from "../components/appbar/InputBar";
import ChatList from "../components/chats/ChatList";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chats: {
    background:
      "url('https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png')",
    backgroundColor: "#03141f",
    minHeight: "90vh",
    backgroundAttachment: "fixed",
    backgroundSize: "100% auto",
  },
}));

export default function Chat(props) {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (typing) {
      setTimeout(() => {
        setTyping(false);
      }, 3000);
    }
  }, [typing]);

  props.room.onmessage = (e) => {
    let data = JSON.parse(e.data);
    console.log("New msg:", data);

    if (data.type === "typing") {
      setTyping(true);
    } else {
      setMessages([
        ...messages,
        {
          author: "they",
          message: data.message,
        },
      ]);
    }
  };

  return (
    <>
      <CustomAppBar typing={typing} />
      <br />
      <br />
      <br />
      <div className={classes.chats}>
        <ChatList {...props} messages={messages} setMessages={setMessages} />
      </div>
      <div style={{ padding: "10px" }}>
        <InputBar {...props} messages={messages} setMessages={setMessages} />
      </div>
    </>
  );
}
