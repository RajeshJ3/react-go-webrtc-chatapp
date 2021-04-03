import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Send } from "@material-ui/icons";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: "0px",
    padding: "0px 5px 0px 5px",
  },
  input: {
    color: "#fff",
  },
}));

export default function InputBar(props) {
  const classes = useStyles();
  const [text, setText] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    props.room.send(
      JSON.stringify({
        type: "message",
        message: text,
      })
    );

    props.setMessages([
      ...props.messages,
      {
        author: "me",
        message: text,
      },
    ]);

    setText("");
  };

  const sendTyping = () => {
    props.room.send(
      JSON.stringify({
        type: "typing",
      })
    );
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <form onSubmit={(e) => sendMessage(e)}>
          <Toolbar>
            <TextField
              size="small"
              fullWidth
              edge="start"
              value={text}
              onChange={(e) => {
                sendTyping();
                setText(e.target.value);
              }}
              type="text"
              placeholder="Start writing.."
              className={classes.input}
            />
            <IconButton onClick={sendMessage} edge="end" color="inherit">
              <Send />
            </IconButton>
          </Toolbar>
        </form>
      </AppBar>
    </>
  );
}
