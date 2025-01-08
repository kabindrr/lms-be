import Joi from "joi";
import { ResponseClient } from "../ResponseClient.js";

export const validateData = ({ req, res, next, obj }) => {
  //create schema or rules
  const schema = Joi.object(obj);

  //pass your data, req.body to the schema

  const { error } = schema.validate(req.body);

  if (error) {
    return ResponseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  //if pass go next() or response error from here
  next();
};
