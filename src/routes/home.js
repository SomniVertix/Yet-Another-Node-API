"use strict";

module.exports = app => {
  app.get("/home/", function(req, res, next) {
    res.send("Home");
    next();
  });
};
