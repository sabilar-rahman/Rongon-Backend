import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { Student } from "./student.model";
import sendResponse from "../utils/sendResponse";
import AppError from "../../errors/AppError";
import { Request, Response } from "express";

const createStudent = catchAsync(async (req, res) => {
  const studentData = req.body;

  const student = await Student.create(studentData);
  // this is to check if batch already exists and there need to send payload

  //  const existingBatch = await Student.findOne({
  //    phoneNumber: payload.phoneNumber,
  //  });
  //  if (existingBatch) {
  //    throw new AppError(httpStatus.CONFLICT, "Student already exists");
  //  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully",
    data: student,
  });
});

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const student = await Student.find();

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student retrieved successfully",
    data: student,
  });
});

const getStudentById = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const student = await Student.findById(studentId);

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Student ID retrieved successfully",
    data: student,
  });
});

const updateStudentById = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const updatedData = req.body;
  const student = await Student.findByIdAndUpdate(studentId, updatedData, {
    new: true,
  });
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: student,
  });
});

const deleteStudentById = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const student = await Student.findByIdAndDelete(studentId);
  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, "Student not found");
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student deleted successfully",
    data: student,
  });
});

export const StudentController = {
  createStudent,
  getAllStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
