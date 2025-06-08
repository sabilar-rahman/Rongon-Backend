/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { User } from "../user/user.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createReview = async (reviewData: TReview, authorizationHeader: any) => {
  // Verify and decode the JWT token
  if (!authorizationHeader) {
    throw new Error("Authorization token is missing or invalid");
  }

  const token = authorizationHeader.split(" ")[1];
  let loggedInUserId;
  try {
    const decodedToken = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    loggedInUserId = decodedToken.sub;
  } catch  {
    // throw new Error("Invalid token");
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
  }

  const user = await User.findById(loggedInUserId);
  console.log("user data", user);
  if (!user) {
    throw new Error("User not found");
  }

  // Attach user data to the review data
  const reviewWithUserData = {
    ...reviewData,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      img: user.img,
    },
  };

  const review = await Review.create(reviewWithUserData);
  return review;
};

const getAllReviews = async () => {
  const review = await Review.find();
  return review;
};

export const RevieweServices = {
  createReview,

  getAllReviews,
};