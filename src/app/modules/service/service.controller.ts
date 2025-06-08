
import { ServiceServices } from "./service.service";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";

const createService = catchAsync(async (req, res) => {
  const serviceData = req.body;
  const service = await ServiceServices.createService(serviceData);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Service created successfully",
    data: service,
  });
});

const getServiceById = catchAsync(async (req, res) => {
  const serviceId = req.params.id;
  const service = await ServiceServices.getServiceById(serviceId);
  res.status(200).json({
    status: httpStatus.OK,
    message: "Service retrieved successfully",
    success: true,
    data: service,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const services = await ServiceServices.getAllServices();
  res.status(200).json({
    success: true,
    status: httpStatus.OK,
    message: "Services retrieved successfully",
    data: services,
  });
});

const updateService = catchAsync(async (req, res) => {
  const serviceId = req.params.id;
  const updatedData = req.body;
  const service = await ServiceServices.updateService(serviceId, updatedData);
  res.status(200).json({
    success: true,
    status: httpStatus.OK,
    message: "Service updated successfully",
    data: service,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const serviceId = req.params.id;
  const { isDeleted } = req.body;
  const service = await ServiceServices.deleteServiceFromDB(
    serviceId,
    isDeleted
  );
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Service deleted successfully",
    data: service,
  });
});

const createSlot = catchAsync(async (req, res) => {
  const slotData = req.body;
  const slots = await ServiceServices.createSlots(slotData);
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Slots created successfully",
    data: slots,
  });
});

export const ServiceController = {
  createService,
  getServiceById,
  getAllServices,
  updateService,
  deleteService,
  createSlot,
};