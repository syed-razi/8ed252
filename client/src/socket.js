import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  addActiveConversation,
  readNewMessages,
  updateMessages,
  updateLastReadMessage,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });
  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    // Only set new message for correct recipient
    if (data.recipientId === store.getState().user.id) {
      store.dispatch(setNewMessage(data.message, data.sender));
      store.dispatch(updateMessages(data.message));
    }
  });
  socket.on("read-messages", (data) => {
    store.dispatch(readNewMessages(data.convoId));
    store.dispatch(updateLastReadMessage(data));
  });
  socket.on("add-active-conversation", (data) => {
    if (
      store
        .getState()
        .conversations.find((convo) => convo.otherUser.id === data.userId)
    ) {
      store.dispatch(addActiveConversation(data));
    }
  });
});

export default socket;
