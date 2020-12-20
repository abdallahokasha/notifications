const joi = require("joi");

module.exports = joi.object().keys({
  ride: joi
    .object()
    .required()
    .keys({
      busLine: joi
        .string()
        .trim()
        .required()
        .empty(""),
      userId: joi
        .string()
        .trim()
        .empty("")
        .required(),
      userEmail: joi
        .string()
        .trim()
        .email()
        .empty("")
        .required()
    })
});
