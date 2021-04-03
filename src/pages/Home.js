import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Peer1 from "../components/peers/Peer1";
import Peer2 from "../components/peers/Peer2";

const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "url('https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png')",
    backgroundColor: "#03141f",
    backgroundAttachment: "fixed",
    backgroundSize: "100% auto",
  },
  title: {
    color: "#f2f2f2",
  },
  code: {
    backgroundColor: "#e2e2e2",
    padding: "10px",
    fontSize: "15px",
    borderRadius: "5px",
    maxWidth: "350px",
    margin: "20px auto",
    maxHeight: "120px",
    overflowY: "scroll",
  },
  textFieldWrapper: {
    borderRadius: "5px",
    maxWidth: "370px",
    margin: "auto",
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Home(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Peer1 {...props} />
        <br />
        <Typography
          variant="subtitle1"
          align="center"
          className={classes.title}
        >
          - OR -
        </Typography>

        <br />
        <Peer2 {...props} />
        <br />
        <br />
      </Container>
    </div>
  );
}
