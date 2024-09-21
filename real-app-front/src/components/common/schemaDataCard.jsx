import { emailRegex, phoneRegex, webRegex } from "../Regex/refgex";
import Joi from "joi";

const schemaDataCard = Joi.object({
  title: Joi.string().min(2).max(256).required().label("Title"),
  subtitle: Joi.string().min(2).max(256).required().label("Subtitle"),
  description: Joi.string().min(2).max(1024).required().label("Description"),
  phone: Joi.string()
    .min(9)
    .max(11)
    .pattern(phoneRegex)
    .message("phone must be a standard Israeli phone number")
    .required()
    .label("Phone"),
  email: Joi.string()
    .min(5)
    .required()
    .pattern(emailRegex)
    .message("email must be a standard email")
    .label("Email"),
  web: Joi.string()
    .min(14)
    .pattern(webRegex)
    .allow("")
    .message("web must be a standard URL")
    .label("Web"),
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
    state: Joi.string().allow("").label("state"),
    country: Joi.string().required().label("country"),
    city: Joi.string().required().label("city"),
    street: Joi.string().required().label("street"),
    houseNumber: Joi.number()
      .min(1)
      .required()
      .empty("")
      .messages({
        "number.base": "house number must be a number",
        "number.empty": "house number can't be empty",
        "any.required": "house is not allowed to be empty",
      })
      .label("house number"),
    zip: Joi.number()
      .required()
      .empty("")
      .messages({
        "number.base": "zip must be a number",
        "number.empty": "zip can't be empty",
        "any.required": "zip is not allowed to be empty",
      })
      .label("zip"),
  }),
});
export default schemaDataCard;
