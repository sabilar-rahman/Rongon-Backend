import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import catchAsync from "../modules/utils/catchAsync";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import httpStatus from "http-status";

// ============================================================
// Authentication Middleware
// ============================================================

/*
const auth = (...userRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // ------------------------------------------------------------
    // 1. Extract and Validate JWT Token
    // ------------------------------------------------------------
    const token = req.headers.authorization?.split(" ")[1];
    // Check if token is provided in the Authorization header
    if (!token) {
      throw new AppError(401, "You are not authorized");
    }

    // ------------------------------------------------------------
    // 2. Verify JWT and Decode Payload
    // ------------------------------------------------------------

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    // ------------------------------------------------------------
    // 2.2 handling the JWT verification errors while keeping the main structure intact. 

    

    // let decoded;
    // try {
    //   decoded = jwt.verify(
    //     token,
    //     config.jwt_access_secret as string
    //   ) as JwtPayload;
    // } catch (error) {
    //   throw new AppError(401, "You are not authorized");
    // }

    // ------------------------------------------------------------
    // 3. Check if User Role is Authorized
    // ------------------------------------------------------------
    if (userRoles && !userRoles.includes(decoded?.role)) {
      throw new AppError(401, "You are not authorized");
    }

    // ------------------------------------------------------------
    // 4. Attach Decoded User Info to Request Object
    // ------------------------------------------------------------
    req.user = decoded as JwtPayload;
    // ------------------------------------------------------------
    // 5. Proceed to Next Middleware or Controller
    // ------------------------------------------------------------
    next();
  });
};
**/


const auth = (...requiredRoles: TUserRole[]) => {
  // console.log(...requiredRoles);
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;
    // console.log("Authorization header =", authorizationHeader);
    if (!authorizationHeader) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const token = authorizationHeader.startsWith("Bearer ")
      ? authorizationHeader.split(" ")[1]
      : null;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // Check if the token is valid
    jwt.verify(token, config.jwt_access_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const role = (decoded as JwtPayload).role;

      if (requiredRoles && !requiredRoles.includes(role)) {
        return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: "You have no access to this route",
        });
      }

      req.user = decoded as JwtPayload;
      next();
    });
  });
};


export default auth;
