import { ObjectId } from "mongoose";

export type TService = {
  id: ObjectId;
  name: string;
  img: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
};

export type TSlot = {
  id: ObjectId;
  service: ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
};