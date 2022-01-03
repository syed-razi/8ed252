const router = require("express").Router();
const { User } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// find users by username
router.get("/:username", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { username } = req.params;

    const users = await User.findAll({
      where: {
        username: {
          [Op.substring]: username,
        },
        id: {
          [Op.not]: req.user.id,
        },
      },
    });

    // add online status to each user that is online and which conversation they are in if any
    for (let i = 0; i < users.length; i++) {
      const userJSON = users[i].toJSON();
      const onlineUser = onlineUsers.find(user => user.id === userJSON.id)
      if (onlineUser) {
        userJSON.online = true;
        userJSON.activeConversation = onlineUser.activeConversation;
      }
      users[i] = userJSON;
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
