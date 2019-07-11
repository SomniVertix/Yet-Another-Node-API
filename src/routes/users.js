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
  app.get("/users", (req, res, next) => {
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
            userId: doc.data().userId,
            authLevel: doc.data().authLevel
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
  app.get("/users/:id([0-9]+)", (req, res, next) => {
    const usersRef = firebaseDb.collection("users");
    let user;
    let id = parseInt(req.params.id);
    let queryRef = usersRef.where("userId", "==", id);

    queryRef
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = {
            dept: doc.data().dept,
            name: doc.data().name,
            userId: doc.data().userId,
            authLevel: doc.data().authLevel
          };
          user = data;
        });
      })
      .then(() => {
        let result = user ? user : "{user not found}";
        res.send(result);
        next();
      });
  });
};
