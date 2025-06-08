import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const ValidateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      // validation with Higher Order
      //  if everything all right next()
  
      try {
        await schema.parseAsync({
          body: req.body,
          cookies: req.cookies, //this portion added for validate request with cookies
        });
  
        return next();
      } catch (err) {
        next(err);
      }
    };
  };

  export default ValidateRequest ;