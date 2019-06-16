"use strict";
const Joi = require("joi");


module.exports = (app) => {
  app.get("/", function(req, res, next) {

    res.send({ Home: "Home" });
    next();
  });
};
