import { z } from "zod";

export const createServiceValidationSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  img: z.string().min(1, "Image is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  duration: z
    .number()
    .positive("Duration must be a positive number")
    .optional(),
  isDeleted: z.boolean().optional(),
});

export const updateServiceValidationSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  duration: z
    .number()
    .positive("Duration must be a positive number")
    .optional(),
  isDeleted: z.boolean().optional(),
});

export const createSlotValidationSchema = z.object({
  service: z
    .string()
    .refine((value) => {
      return /^[0-9a-fA-F]{24}$/.test(value); // Validate if it's a valid ObjectId
    }, "Invalid service ID")
    .optional(),
  date: z
    .string()
    .refine((value) => {
      return !isNaN(Date.parse(value)); // Check if date is valid
    }, "Invalid date format")
    .optional(),
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid start time format (HH:mm)"
    )
    .optional(),
  endTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid end time format (HH:mm)"
    )
    .optional(),
});