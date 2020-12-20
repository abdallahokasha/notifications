const _ = require("lodash");
const joi = require("../utils/promisifiedJoi");

module.exports = (
  joiSchema,
  property = "body",
  reqProp = "validatedBody"
) => async (req, res, next) => {
  const computedProp = _.isFunction(property) ? property(req) : req[property];

  try {
    const body = await joi.validateAsync(computedProp, joiSchema);
    req[reqProp] = body;

    return next();
  } catch (err) {
    return res.status(400).json(`validation Error, error: ${err}`);
  }
  //  next()
};
