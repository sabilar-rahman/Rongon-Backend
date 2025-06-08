import httpStatus from "http-status";
import { RevieweServices } from "./review.service";
import catchAsync from "../utils/catchAsync";

const createReview = catchAsync(async (req, res) => {
  const reviewData = req.body;
  const authorizationHeader = req.headers.authorization as string;

  try {
    const result = await RevieweServices.createReview(
      reviewData,
      authorizationHeader
    );

    console.log("Created review:", result);

    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Review created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating review:", error);

    res.status(500).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to create review",
      error: error,
    });
  }
});

const getAllReviews = catchAsync(async (req, res) => {
  const reviews = await RevieweServices.getAllReviews();
  console.log("Retrieved reviews:", reviews);

  if (!reviews) {
    return res.status(404).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No reviews found",
    });
  }

  res.status(200).json({
    success: true,
    status: httpStatus.OK,
    message: "Reviews retrieved successfully",
    data: reviews,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
};