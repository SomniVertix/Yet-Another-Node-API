"use strict";
const Joi = require("joi");

/**
 * Schema validation middleware function for abstraction and cleaner code on endpoints
 * @param {*} schema Joi schema
 * @param {*} req request from enpoint
 * @param {*} res response from enpoint
 * @param {*} next next function that pushes to the next function
 */
const validate = (schema, req, res, next) => {
  let validationObject = req.method === "GET" ? req.query : req.body;

  Joi.validate(
    validationObject,
    schema,
    { abortEarly: true },
    (err, schemaResult) => {
      if (err) {
        const details = [];
        err.details.forEach(detail => {
          details.push({ message: detail.message, path: detail.path });
        });
        throw Error("Invalid schema");
      }
      req.schema = schemaResult;
      return next();
    }
  );
};

module.exports = validate;
