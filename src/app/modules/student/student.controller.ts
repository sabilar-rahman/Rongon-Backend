import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { Student } from "./student.model";
import sendResponse from "../utils/sendResponse";
import AppError from "../../errors/AppError";
import { Request, Response } from "express";
import QueryBuilder from "../../builder/queryBuilder";

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

// const getAllStudent = catchAsync(async (req: Request, res: Response) => {
//   const student = await Student.find();

//   if (!student) {
//     throw new AppError(httpStatus.NOT_FOUND, "Student not found");
//   }

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Student retrieved successfully",
//     data: student,
//   });
// });

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const studentSearchableFields = ["name", "email", "phoneNumber", "batchId"];

  // Instantiate the builder and chain the desired methods
  const studentQuery = new QueryBuilder(Student.find(), req.query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate("batchId");
    // .populate([
    //   {
    //     path: "batchId",
    //      select: "batchNumber session",
        
    //   },
    // ])

  // Execute the query to get the final result
  const result = await studentQuery.execute();

  // Send the structured response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Students retrieved successfully",
    meta: result?.meta,
    data: result?.data,
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
