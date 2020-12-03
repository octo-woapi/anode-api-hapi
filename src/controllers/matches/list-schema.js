const Joi = require("joi");
const { config } = require("../../../config/config");

exports.listMatchesQueryParamsSchema = Joi.object({
  limit: Joi.number()
    .integer()
    .min(config.minListLimit)
    .max(config.maxListLimit)
    .description("Max number of list per page"),
  page: Joi.number()
    .integer()
    .min(config.minListPage)
    .description("Page number"),
});
