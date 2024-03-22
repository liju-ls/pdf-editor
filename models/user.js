import { Schema, model, ObjectId } from "mongoose";

const fileSchema = new Schema(
  {
    fileName: { type: String, required: true },
    fileNameServer: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  files: [fileSchema],
});

export default model("users", userSchema);
