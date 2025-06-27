const express = require("express");

const viewRouter = express.Router();

viewRouter.get("/loguin", (req, res, next) => {
  try {
    return res.render("index", {});
  } catch (error) {
    next(error);
  }
});

module.exports = viewRouter;
