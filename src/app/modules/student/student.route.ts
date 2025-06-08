import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

router.post('/',StudentController.createStudent);
router.get('/',StudentController.getAllStudent);
router.get('/:id',StudentController.getStudentById);

export const StudentRoutes = router