import { Schema, model } from "mongoose";
import { TStudent } from "./student.interface";

const studentSchema = new Schema<TStudent>(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    secondaryPhoneNumber: {
      type: String,
      required: true,
    },
    parentsPhoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    nid: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    sscResult: {
      type: String,
      required: true,
    },
    hscResult: {
      type: String,
      required: true,
    },
    honorsResult: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Student = model<TStudent>("Student", studentSchema);
