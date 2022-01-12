const db = require("../db");
const Sequelize = require("sequelize");

const MessageRecipients = db.define("message_recipients", {
  read: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = MessageRecipients;
