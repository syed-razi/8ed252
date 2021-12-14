import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const lastReadMessageId = messages
    .filter((message) => message.senderId === userId && message.read).slice(-1)[0]?.id;

  return (
    <Box>
      {messages
        .map((message) => {
          const time = moment(message.createdAt).format("h:mm");

          return message.senderId === userId ? (
            <SenderBubble
              key={message.id}
              id={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
              lastReadMessageId={lastReadMessageId}
            />
          ) : (
            <OtherUserBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
            />
          );
        })}
    </Box>
  );
};

export default Messages;
