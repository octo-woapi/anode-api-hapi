const Joi = require("joi");

exports.listMatchesQueryParams = Joi.object({
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .description("Max number of list per page"),
  page: Joi.number().integer().min(1).description("Page number"),
});
