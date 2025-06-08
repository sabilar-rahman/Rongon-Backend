// গত সপ্তাহে catchasync নামে একটা হায়ারঅর্ডার ফাংশন দিয়ে , asnchronas fn receive  
// kortechi  এরপর আমরা সিনক্রোনাসংশন কে কল দিচ্ছি promise.resolve er maddhome 
//  যাতে করে সল্ভ হওয়ার ট্রাই করে এরর হয় তাহলে ক্যাশগুলোকে ইররকে পাঠিয়ে দেবে .

import { NextFunction, Request, RequestHandler, Response } from "express";

// Higher order Function

//  Avoid Repetition Of Try-Catch , Use CatchAsync

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
  };


  export default catchAsync;