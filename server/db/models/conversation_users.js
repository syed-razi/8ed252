const User = require("./user");
const Conversation = require("./conversation");
const db = require("../db");
const Sequelize = require("sequelize");

const ConversationUsers = db.define("conversation_users", {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  conversationId: {
    type: Sequelize.INTEGER,
    references: {
      model: Conversation,
      key: "id",
    },
  },
});

module.exports = ConversationUsers;
