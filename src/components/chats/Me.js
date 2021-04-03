import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    justifyContent: "flex-end",
  },
  text:{
    maxWidth:"60%",
    padding: "10px",
    borderRadius: ".35em",
    margin: "2px 10px 10px 10px",
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.text.dark,
  }
}));

export default function MyChat(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <p className={classes.text}>{props.msg}</p>
    </div>
  );
}
