// import { Response } from "express";

// type TResponse<T> = {
//   statusCode: number;
//   success: boolean;
//   token?: string;
//   message?: string;
//   data: T;
// };

// const sendResponse = <T>(res: Response, data: TResponse<T>) => {
//   res.status(data?.statusCode).json({
//     success: data.success,
//     message: data.message,
//     // token: data.token,
//     data: data?.data,
//   });
// };

// export default sendResponse;

import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data:data.data  && data.data,
    meta: data.meta && data.meta,
  });
};

export default sendResponse;
