import {ObjectId, Types } from "mongoose";

export type TStudent = {
 id: ObjectId;
  name: string;
  fatherName: string;
  motherName: string;
  bloodGroup: string;
  gender: string;
  phoneNumber: string;
  secondaryPhoneNumber: string;
  parentsPhoneNumber: string;
  email: string;
  nid: string;
  dob: string;
  religion: string;
  presentAddress: string;
  sscResult: string;
  hscResult: string;
  honorsResult: string;
  isDeleted: boolean;
  batchId: Types.ObjectId;

};

// export interface studentModel extends Model<TStudent> {
//   isUserExists(email: string): Promise<TStudent> | null;
// }
