/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Create a new service
import { TService, TSlot } from "./service.interface";
import { Service, Slot } from "./service.model";

import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createService = async (serviceData: TService) => {
  const service = await Service.create(serviceData);
  return service;
};

const getServiceById = async (id: string) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }
  return service;
};

const getAllServices = async () => {
  const services = await Service.find({ isDeleted: false });
  return services;
};

const updateService = async (id: string, updatedData: Partial<TService>) => {
  const service = await Service.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }
  return service;
};

const deleteServiceFromDB = async (id: string, isDeleted: boolean) => {
  const service = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }
  return service;
};

const createSlots = async (slotData: TSlot) => {
  const { service, date, startTime, endTime } = slotData;
  const serviceDetails = await Service.findById(service);
  if (!serviceDetails) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  const serviceDuration = serviceDetails.duration;

  const startMinutes =
    parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
  const endMinutes =
    parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
  const totalDuration = endMinutes - startMinutes;

  const slots = [];
  for (let i = 0; i < totalDuration; i += serviceDuration) {
    const slotStartMinutes = startMinutes + i;
    const slotEndMinutes = slotStartMinutes + serviceDuration;

    const slotStartTime = `${String(Math.floor(slotStartMinutes / 60)).padStart(
      2,
      "0"
    )}:${String(slotStartMinutes % 60).padStart(2, "0")}`;
    const slotEndTime = `${String(Math.floor(slotEndMinutes / 60)).padStart(
      2,
      "0"
    )}:${String(slotEndMinutes % 60).padStart(2, "0")}`;

    const slot = await Slot.create({
      service,
      date,
      isBooked: "available",
      startTime: slotStartTime,
      endTime: slotEndTime,
    });

    slots.push(slot);
  }

  return slots;
};

const getServiceSlotById = async (id: string) => {
  const serviceSlot = await Slot.findById(id);
  if (!serviceSlot) {
    throw new AppError(httpStatus.NOT_FOUND, "serviceSlot not found");
  }
  return serviceSlot;
};
export const ServiceServices = {
  createService,
  getServiceById,
  getAllServices,
  updateService,
  deleteServiceFromDB,
  createSlots,
  getServiceSlotById,
};