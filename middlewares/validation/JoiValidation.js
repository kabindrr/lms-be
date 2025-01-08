import JOI from "joi";
import { ResponseClient } from "../ResponseClient.js";

export const validateData = (req, res, next) => {
  //create schema or rules

  const schema = JOI.object({
    fName: JOI.string().min(2).max(15).required(),
    lName: JOI.string().min(2).max(15).required(),
    email: JOI.string().email({ minDomainSegments: 2 }).required(),
    phone: JOI.number(),
    password: JOI.string().required(),
  });

  //pass your data, req.body to the schema

  const { value, error } = schema.validate(req.body);

  if (error) {
    return ResponseClient({
      req,
      res,
      message: value.error.message,
      statusCode: 400,
    });
  }
  //if pass go next() or response error from here
  next();
};
