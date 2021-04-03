import { Component } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = (theme) => ({
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
});

class Peer1 extends Component {
  state = {
    offer: "",
    answer: "",
  };

  componentDidMount() {
    this.lc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    this.lc.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(JSON.stringify(e.candidate));
      }
    };

    this.lc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    this.dc = this.lc.createDataChannel("channel");

    this.dc.onmessage = (e) => {
      console.log("[MSG] ", e.data);
    };
    this.dc.onopen = (e) => {
      console.log("[OPEN]");
      this.props.setRoom(this.dc);
      this.props.setOpen(true);
    };

    this.dc.onclose = (e) => {
      console.log("[CLOSE]");
      this.props.setOpen(false);
    };

    this.lc.createOffer().then(
      (sdp) => {
        this.lc.setLocalDescription(sdp);
        this.setState({ ...this.state, offer: JSON.stringify(sdp) });
      },
      (e) => {}
    );
  }

  submitAnswer = () => {
    this.lc.setRemoteDescription(JSON.parse(this.state.answer));
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <br />
        <Typography variant="h4" align="center" className={classes.title}>
          Share Code
        </Typography>
        <br />
        <br />
        <Typography variant="body1" align="center" className={classes.title}>
          <b>Step 1:</b> Copy and send the code to your friend
        </Typography>
        <div className={classes.code} onClick={() => {}}>
          <Typography variant="body1" align="center" id="offer">
            <CopyToClipboard
              text={this.state.offer}
              onCopy={() => alert("Copied")}
            >
              <span>{this.state.offer}</span>
            </CopyToClipboard>
          </Typography>
        </div>
        <br />
        <br />
        <Typography variant="body1" align="center" className={classes.title}>
          <b>Step 2:</b> Paste the code provided by your friend.
        </Typography>
        <br />
        <div className={classes.textFieldWrapper}>
          <TextField
            fullWidth
            multiline
            size="small"
            rows={5}
            required
            value={this.state.answer}
            onChange={(e) =>
              this.setState({ ...this.state, answer: e.target.value })
            }
            label="Code from friend"
            variant="filled"
          />
        </div>
        <br />
        <center>
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitAnswer}
          >
            Connect
          </Button>
        </center>
        <br />
      </>
    );
  }
}

export default withStyles(useStyles)(Peer1);
