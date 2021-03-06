import { Schema, model, Document } from "mongoose";

// User interface
interface UserDoc extends Document {
  userId: string;
  username: string;
}

// Response interface
interface ResponseDoc extends Document {
  question: string;
  answer: string | string[];
}

// UserResponse interface
interface UserResponseDoc extends Document {
  user: UserDoc;
  responses: ResponseDoc[];
}

// User schema
const userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
});

// Response schema
const responseSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: Schema.Types.Mixed, required: true },
});

// UserResponse schema
const userResponseSchema = new Schema({
  user: { type: userSchema, required: true },
  responses: { type: [responseSchema], required: true },
});

export const User = model<UserDoc>("User", userSchema);
export const Response = model<ResponseDoc>("Response", responseSchema);
export const UserResponse = model<UserResponseDoc>("UserResponse", userResponseSchema);
