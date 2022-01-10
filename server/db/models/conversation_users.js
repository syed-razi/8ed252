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

// find conversation given the sender and recipients

ConversationUsers.findConversation = async function (senderId, recipientIds) {
  const userIds = [senderId, ...recipientIds];
  const numUserIds = userIds.length;

  const conversation = await ConversationUsers.findAll({
    attributes: ["conversationId"],
    group: ["conversationId"],
    having: 
      Sequelize.literal(
        `SUM(CASE WHEN "userId" in (${userIds}) then 1 else 0 end) = ${numUserIds} AND count(*) = ${numUserIds}`
      ),
  });

  return conversation;
};

module.exports = ConversationUsers;
