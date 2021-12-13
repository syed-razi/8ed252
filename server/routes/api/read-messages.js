const router = require("express").Router();
const { Message } = require("../../db/models");

router.post("/", async (req, res, next) => {
  try {
    const { id: convoId, messages } = req.body;
    let updatedMessages = [];
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const result = await Message.update(
        { read: true },
        {
          where: {
            id: message.id,
          },
          returning: true,
          plain: true,
        }
      );
      updatedMessages.push(result[1]);
    }

    for (let i = 0; i < updatedMessages.length; i++) {
      const message = updatedMessages[i];
      const messageJSON = message.toJSON();

    
      updatedMessages[i] = messageJSON;
    }

    res.json({ convoId, updatedMessages });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
