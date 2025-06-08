import { ObjectId } from "mongoose";

export type TReview = {
  id: ObjectId;
  rating: number;
  review: string;
  user: ObjectId;
};