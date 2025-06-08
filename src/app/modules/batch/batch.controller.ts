/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
// import { Service } from "./service.model";
// import { TService } from "./service.interface";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { TBatch } from "./batch.interface";
import { Batch } from "./batch.model";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/queryBuilder";
import sendResponse from "../utils/sendResponse";

// Combined function: create and respond
const createBatch = catchAsync(async (req: Request, res: Response) => {
  const serviceData: TBatch = req.body;

  const service = await Batch.create(serviceData); // database operation

  // this is to check if batch already exists and there need to send payload

  // const existingBatch = await Batch.findOne({
  //   batchNumber: payload.batchNumber,
  // });
  // if (existingBatch) {
  //   throw new AppError(httpStatus.CONFLICT, "Batch already exists");
  // }

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Service created successfully",
    data: service,
  });
});

// get all batch

// const getAllBatches = catchAsync(async (req: Request, res: Response) => {
//   const batches = await Batch.find();

//   if (!batches) {
//     throw new AppError(httpStatus.NOT_FOUND, "Batch not found");
//   }

//   res.status(httpStatus.OK).json({
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Batches retrieved successfully",
//     data: batches,
//   });
// });

const getAllBatches = catchAsync(async (req: Request, res: Response) => {
  
  const batchSearchableFields = ['name', 'year', 'batchNumber', 'session'];

  // Instantiate the builder and chain the desired methods
  const batchQuery = new QueryBuilder(Batch.find(), req.query)
    .search(batchSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    //.populate(); // Example: populate a related field if it exists

  // Execute the query to get the final result
  const result = await batchQuery.execute();

  // Send the structured response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Batches retrieved successfully',
    meta: result?.meta,
     data: result?.data ? result?.data : result,
  });
});

// get batch by id

const getBatchById = catchAsync(async (req: Request, res: Response) => {
  const batchId = req.params.id;
  const batch = await Batch.findById(batchId);

  if (!batch) {
    throw new AppError(httpStatus.NOT_FOUND, "Batch not found");
  }
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Batch ID retrieved successfully",
    data: batch,
  });
});

const updateBatch = catchAsync(async (req: Request, res: Response) => {
  const batchId = req.params.id;
  const updatedData = req.body;
  const batch = await Batch.findByIdAndUpdate(batchId, updatedData, {
    new: true,
  });
  if (!batch) {
    throw new AppError(httpStatus.NOT_FOUND, "Batch not found");
  }
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Batch updated successfully",
    data: batch,
  });
});

const deleteBatch = catchAsync(async (req: Request, res: Response) => {
  const batchId = req.params.id;
  const batch = await Batch.findByIdAndDelete(batchId);
  if (!batch) {
    throw new AppError(httpStatus.NOT_FOUND, "Batch not found");
  }
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Batch deleted successfully",
    data: batch,
  });
});

export const BatchController = {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
};
