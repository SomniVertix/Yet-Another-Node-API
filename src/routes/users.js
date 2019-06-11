"use strict";
const firebaseDb = require("../config/firebaseInit");
const schemaValidator = require("../lib/utils/schemaValidator");
const Joi = require("joi");

const GLOBAL_LIMIT = 10;
const GLOBAL_ORDERBY = "dept";

module.exports = app => {
  /**
   * Get all users
   */
  app.get("/users", function(req, res, next) {
    let users = new Array();

    const querySchema = Joi.object().keys({
      limit: Joi.number()
        .positive()
        .integer(),
      orderBy: Joi.string()
    });

    schemaValidator(querySchema, req, res, next);
    let limit = req.schema.limit || GLOBAL_LIMIT;
    let orderBy = req.schema.orderBy || GLOBAL_ORDERBY;

    const usersRef = firebaseDb
      .collection("users")
      .orderBy(orderBy)
      .limit(limit);

    usersRef
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let data = {
            dept: doc.data().dept,
            name: doc.data().name,
            userId: doc.data().userId
          };
          users.push(data);
        });
      })
      .then(() => {
        res.send(users);
        next();
      });
  });

  /**
   * Get single user
   */
  app.get("/users/:id", function(req, res, next) {
    
  });
};
