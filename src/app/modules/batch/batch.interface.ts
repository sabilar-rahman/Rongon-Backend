import { ObjectId } from "mongoose";

export type TBatch = {
  id: ObjectId;
  year: string;
  batchNumber: string;
  session: string;
};


