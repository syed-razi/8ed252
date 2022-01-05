import React from "react";
import { Box, Chip } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { readMessages } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  chip: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 5,
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, user } = props;
  const { otherUser, numUnreadMessages } = conversation;

  const handleClick = async (conversation) => {
    // Only need to read messages if there are unread messages sent by another user
    if (
      conversation.messages.length > 0 &&
      conversation.latestMessage.senderId !== user.id &&
      !conversation.latestMessage.read
    ) {
      await props.readMessages(conversation);
    }
    await props.setActiveChat({
      userId: user.id,
      activeConversation: conversation.otherUser.username,
    });
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {numUnreadMessages > 0 && (
        <Chip
          className={classes.chip}
          label={numUnreadMessages}
          color="primary"
          size="small"
        />
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    readMessages: (conversation) => {
      dispatch(readMessages(conversation));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
