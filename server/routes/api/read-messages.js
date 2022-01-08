const router = require("express").Router();
const { Message } = require("../../db/models");

router.patch("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { id } = req.body;

    const result = await Message.update(
      { read: true },
      {
        where: {
          conversationId: id,
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
