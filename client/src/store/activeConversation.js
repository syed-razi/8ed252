import socket from "../socket";

const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";

export const setActiveChat = (data) => {
  return {
    type: SET_ACTIVE_CHAT,
    payload: { ...data },
  };
};

const reducer = (state = "", action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      socket.emit("enter-conversation", action.payload);
      return action.payload.activeConversation;
    }
    default:
      return state;
  }
};

export default reducer;
