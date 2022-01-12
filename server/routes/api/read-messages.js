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
      //When returning is true, update returns an array with the second item (index 1) being the updated db value
      updatedMessages.push(result[1].toJSON());
    }

    res.json({ convoId, updatedMessages });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
