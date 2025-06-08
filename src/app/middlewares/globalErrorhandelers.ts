/* eslint-disable @typescript-eslint/no-unused-vars */
 
/* eslint-disable no-unused-vars */

// import { Request, Response, NextFunction } from "express";

// const globalErrorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const statusCode =  err.statusCode || 500;
//   const message =  err.message || "Something went wrong!";

//   return res.status(statusCode).json({
//     success: false,
//     message,
//     error: err,
//   });
// };

// export default globalErrorHandler;

/*
 Understanding Error Patterns in Zod and Mongoose
*/



import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import config from "../config";
import { TErrorSources } from "../interface/error";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

// const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   // Setting default values

//   let statusCode = err.statusCode || 500;
//   let message = err.message || "Something went wrong!";

//   // type TerrorSources = {
//   //   path: string | number;
//   //   message: string;
//   // }[];

//   let errorSources: TErrorSources = [
//     {
//       path: "",
//       message: "Something went wrong",
//     },
//   ];

//   if (err instanceof ZodError) {
//     const simplifiedError = handleZodError(err);
//     statusCode = simplifiedError?.statusCode;
//     message = simplifiedError?.message;
//     errorSources = simplifiedError?.errorSources;
//   } else if (err?.name === "ValidationError") {
//     const simplifiedError = handleValidationError(err);
//     statusCode = simplifiedError?.statusCode;
//     message = simplifiedError?.message;
//     errorSources = simplifiedError?.errorSources;
//   } else if (err?.name === "CastError") {
//     const simplifiedError = handleCastError(err);
//     statusCode = simplifiedError?.statusCode;
//     message = simplifiedError?.message;
//     errorSources = simplifiedError?.errorSources;
//   } else if (err?.code === 11000) {
//     const simplifiedError = handleDuplicateError(err);
//     statusCode = simplifiedError?.statusCode;
//     message = simplifiedError?.message;
//     errorSources = simplifiedError?.errorSources;

//     return res.status(statusCode).json({
//       success: false,
//       message,

//       errorSources,
//       // error: err,
//       err,
//       stack: config.NODE_ENV === "development" ? err?.stack : null,
//     });
//   }
// };

// export default globalErrorHandler;


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  let errorSources: TErrorSources = [
    {
      path: "",
      message: message,
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    // Let AppError define custom errors
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message,
      },
    ];
  }

  // ✅ Always return a response
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
