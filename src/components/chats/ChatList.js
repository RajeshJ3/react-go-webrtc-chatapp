import { makeStyles } from "@material-ui/core/styles";
import TheirChat from "./Their";
import MyChat from "./Me";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function ChatList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <br />
      {props.messages.map((msg, index) =>
        msg.author === "me" ? (
          <MyChat key={index} msg={msg.message} />
        ) : (
          <TheirChat key={index} msg={msg.message} />
        )
      )}
      <br />
      <br />
    </div>
  );
}
