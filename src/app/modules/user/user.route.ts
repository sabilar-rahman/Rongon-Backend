import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { UserControllers } from "./user.controller";

import { userValidation } from "./user.validation";
import ValidateRequest from "../../middlewares/ValidateRequest";



const router = express.Router();

router.get(
  "/users",
  auth(USER_ROLE.admin), 
  UserControllers.getAllUsers 
);


router.patch(
  "/users/:userId", // Use a dynamic route to specify the user being updated
  auth(USER_ROLE.admin), 
  ValidateRequest(userValidation.updateUserRoleValidationSchema), 
  UserControllers.updateUserRole 
);


// Route for update
router.put(
  "/:id",
  auth(USER_ROLE.user),
  ValidateRequest(userValidation.updateUserValidationSchema),
  UserControllers.updateUserInfo
);
router.post(
  "/signup",
  ValidateRequest(userValidation.createUserValidationSchema),
  UserControllers.createUser
);
router.post(
  "/login",
  ValidateRequest(userValidation.loginValidationSchema),
  UserControllers.loginUser
);
router.post(
  "/refresh-token",
  ValidateRequest(userValidation.refreshTokenValidationSchema),
  UserControllers.refreshToken
);

export const UserRoutes = router;