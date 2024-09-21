import { phoneRegex, webRegex } from "../Regex/refgex";
import Joi from "joi";

const schemaDataUser = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required().label("First Name"),
    middle: Joi.string().min(2).max(256).allow("").label("Middle Name"),
    last: Joi.string().min(2).max(256).required().label("last Name"),
  }),
  phone: Joi.string()
    .pattern(phoneRegex)
    .message("phone must be a standard Israeli phone number")
    .min(9)
    .max(11)
    .required()
    .label("Phone"),
  image: Joi.object({
    url: Joi.string()
      .min(14)
      .pattern(webRegex)
      .message("web must be a standard URL")
      .allow("")
      .label("Image url"),
    alt: Joi.string().min(2).max(256).allow("").label("Image alt"),
  }),
  address: Joi.object({
    state: Joi.string().min(2).max(256).allow("").label("state"),
    country: Joi.string().min(2).max(256).required().label("country"),
    city: Joi.string().min(2).max(256).required().label("city"),
    street: Joi.string().min(2).max(256).required().label("street"),
    houseNumber: Joi.number()
      .min(2)
      .max(256)
      .required()
      .messages({
        "number.min": "house number must be a minimum of 2 digits.",
        "number.base": "house number number must be a number",
        "number.empty": "house number number can't be empty",
        "any.required": "house number is not allowed to be empty",
      })
      .label("house number"),
    zip: Joi.number()
      .min(2)
      .max(256)
      .empty("")
      .messages({
        "number.min": "Zip must be a minimum of 2 digits.",
        "number.base": "Zip number must be a number",
        "number.empty": "Zip number can't be empty",
        "any.required": "Zip is not allowed to be empty",
      })
      .required()
      .label("zip"),
  }),
});
export default schemaDataUser;
