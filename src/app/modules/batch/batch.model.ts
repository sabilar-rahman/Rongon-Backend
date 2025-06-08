import { Schema, model } from "mongoose";
import { TBatch } from "./batch.interface";

const batchSchema = new Schema<TBatch>(
  {
    batchNumber: {
      type: String,
      required: true,
    //   unique: true,
    }, year: {
      type: String,
      required: true,
    //   unique: true,
    },
    session: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Batch = model<TBatch>("Batch", batchSchema);
