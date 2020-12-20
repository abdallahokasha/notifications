const joi = require("joi");
const utils = require("util");

joi.validateAsync = utils.promisify(joi.validate);

module.exports = joi;
