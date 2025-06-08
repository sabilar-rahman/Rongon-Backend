import { Router } from "express";

import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";
import ValidateRequest from "../../middlewares/ValidateRequest";
import { createReviewValidationSchema } from "./review.validation";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  ValidateRequest(createReviewValidationSchema),
  ReviewController.createReview
);

router.get("/", ReviewController.getAllReviews);

export const ReviewRoutes = router;