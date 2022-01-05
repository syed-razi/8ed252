export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      numUnreadMessages: 0,
    };
    newConvo.latestMessage = { ...message };
    //if user's current search results includes the sender, overwrite the fake conversation with the newly created one
    const existingFakeConvo = state.find(
      (convo) => convo.otherUser.id === sender.id
    );
    if (existingFakeConvo) {
      return state.map((convo) => {
        if (convo === existingFakeConvo) {
          return newConvo;
        } else {
          return convo;
        }
      });
    }

    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);
      convoCopy.latestMessage = { ...message };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const updateUnreadMessages = (state, message) => {
  return state.map((convo) => {
    if (convo.id === message.conversationId && !message.read) {
      const convoCopy = { ...convo };
      convoCopy.numUnreadMessages++;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const readMessagesInStore = (state, convoId) => {
  return state.map((convo) => {
    if (convo.id === convoId) {
      const convoCopy = {
        ...convo,
        messages: convo.messages.map((msg) => ({ ...msg, read: true })),
        latestMessage: {
          ...convo.messages[convo.messages.length - 1],
          read: true,
        },
        numUnreadMessages: 0,
      };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      convoCopy.otherUser.activeConversation = "";
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addActiveConversationToStore = (state, payload) => {
  const { userId, activeConversation } = payload;
  return state.map((convo) => {
    if (convo.otherUser.id === userId) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.activeConversation = activeConversation;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      convoCopy.otherUser.activeConversation = "";
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message);
      convoCopy.latestMessage = { ...message };
      return convoCopy;
    } else {
      return convo;
    }
  });
};
