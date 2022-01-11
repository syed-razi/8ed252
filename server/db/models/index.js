const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ConversationUsers = require("./conversation_users");
const MessageRecipients = require("./message_recipients");

// associations

Conversation.belongsToMany(User, { through: ConversationUsers });
User.belongsToMany(Conversation, { through: ConversationUsers });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Message.belongsToMany(User, {
  as: "recipients",
  through: MessageRecipients,
  otherKey: "recipientId",
});
User.belongsToMany(Message, {
  through: MessageRecipients,
  foreignKey: "recipientId",
});

module.exports = {
  User,
  Conversation,
  Message,
};
