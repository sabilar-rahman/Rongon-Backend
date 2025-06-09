import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

router.post('/',StudentController.createStudent);
router.get('/',StudentController.getAllStudent);
router.get('/:id',StudentController.getStudentById);
router.patch('/:id',StudentController.updateStudentById);
router.delete('/:id',StudentController.deleteStudentById);

export const StudentRoutes = router