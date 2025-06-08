import { z } from "zod";

export const createReviewValidationSchema = z.object({
  rating: z.number().min(1, "rating is required").optional(),
  review: z.string().min(1, "Review is required").optional(),
});