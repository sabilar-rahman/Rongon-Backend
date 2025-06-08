import  { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    user: {
      type: Object(),
    },
  },
  {
    timestamps: true,
  }
);

export const Review = model<TReview>("Review", reviewSchema);