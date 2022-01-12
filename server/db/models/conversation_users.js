const User = require("./user");
const Conversation = require("./conversation");
const db = require("../db");
const Sequelize = require("sequelize");

const ConversationUsers = db.define("conversation_users", {});

// find conversation given the sender and recipients

ConversationUsers.findConversation = async function (senderId, recipientIds) {
  const userIds = [senderId, ...recipientIds];
  const numUserIds = userIds.length;

  const conversation = await ConversationUsers.findAll({
    attributes: ["conversationId"],
    group: ["conversationId"],
    having: Sequelize.literal(
      `SUM(CASE WHEN "userId" in (${userIds}) then 1 else 0 end) = ${numUserIds} AND count(*) = ${numUserIds}`
    ),
  });

  return conversation;
};

module.exports = ConversationUsers;
