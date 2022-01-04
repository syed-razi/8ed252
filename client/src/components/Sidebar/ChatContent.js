import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewTextUnread: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
    letterSpacing: -0.17,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, user, activeConversation } = props;
  const { latestMessage, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            !latestMessage?.read && user.id !== latestMessage?.senderId && otherUser.username !== activeConversation
              ? classes.previewTextUnread
              : classes.previewText
          }
        >
          {`${user.id === latestMessage?.senderId ? "You: " : ""} ${
            latestMessage?.text ?? ""
          }`}
        </Typography>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    activeConversation: state.activeConversation,
  };
};

export default connect(mapStateToProps)(ChatContent);
