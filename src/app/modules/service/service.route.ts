import { Router } from "express";
import { ServiceController } from "./service.controller";

import {
  createServiceValidationSchema,
  createSlotValidationSchema,
  updateServiceValidationSchema,
} from "./service.validation";

import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
import ValidateRequest from "../../middlewares/ValidateRequest";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  ValidateRequest(createServiceValidationSchema),
  ServiceController.createService
);
router.get("/:id", ServiceController.getServiceById);
router.get("/", ServiceController.getAllServices);
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  ValidateRequest(updateServiceValidationSchema),
  ServiceController.updateService
);
router.delete("/:id", auth(USER_ROLE.admin), ServiceController.deleteService);
router.post(
  "/slots",
  auth(USER_ROLE.admin),
  ValidateRequest(createSlotValidationSchema),
  ServiceController.createSlot
);

export const ServiceRoutes = router;