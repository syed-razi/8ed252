const router = require("express").Router();
const { Message } = require("../../db/models");

router.patch("/", async (req, res, next) => {
  try {
    const { convoId } = req.body;

    const result = await Message.update(
      { read: true },
      {
        where: {
          conversationId: convoId,
          read: false,
        },
        returning: true,
        raw: true,
      }
    );

    const updatedMessages = result[1];

    if (!updatedMessages) {
      return res.sendStatus(204);
    }

    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
