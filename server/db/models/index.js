const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ConversationUsers = require("./conversation_users");

// associations

Conversation.belongsToMany(User, { through: ConversationUsers });
User.belongsToMany(Conversation, { through: ConversationUsers });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
