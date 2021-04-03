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

class Peer2 extends Component {
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
      this.setState({
        ...this.state,
        answer: JSON.stringify(this.lc.localDescription),
      });
      if (e.candidate) {
        console.log(JSON.stringify(e.candidate));
      }
    };

    this.lc.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    this.lc.ondatachannel = (e) => {
      this.lc.dc = e.channel;
      this.lc.dc.onmessage = (e) => {
        console.log("[MSG] ", e.data);
      };
      this.lc.dc.onopen = (e) => {
        console.log("[OPEN]");
        this.props.setRoom(this.lc.dc);
        this.props.setOpen(true);
      };
      this.lc.dc.onclose = (e) => {
        console.log("[CLOSE]");
        this.props.setOpen(false);
      };
    };
  }

  submitOffer = () => {
    this.lc.setRemoteDescription(JSON.parse(this.state.offer)).then((a) => {
      this.lc.createAnswer().then((a) => {
        this.lc.setLocalDescription(a);
      });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Typography variant="h4" align="center" className={classes.title}>
          Accept Code
        </Typography>
        <br />
        <br />
        <Typography variant="body1" align="center" className={classes.title}>
          <b>Step 1:</b> Paste the code given by your friend
        </Typography>
        <br />
        <div className={classes.textFieldWrapper}>
          <TextField
            id="offer"
            value={this.state.offer}
            onChange={(e) =>
              this.setState({ ...this.state, offer: e.target.value })
            }
            fullWidth
            multiline
            size="small"
            rows={5}
            required
            label="Code from friend"
            variant="filled"
          />
        </div>
        <br />
        <center>
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitOffer}
          >
            Generate Code
          </Button>
        </center>
        <br />
        <br />
        <Typography variant="body1" align="center" className={classes.title}>
          <b>Step 2:</b> Send following the code to your friend
        </Typography>
        <div className={classes.code}>
          <Typography variant="body1" align="center">
          <CopyToClipboard
              text={this.state.answer}
              onCopy={() => alert("Copied")}
            >
              <span>{this.state.answer}</span>
            </CopyToClipboard>
          </Typography>
        </div>
      </>
    );
  }
}

export default withStyles(useStyles)(Peer2);
