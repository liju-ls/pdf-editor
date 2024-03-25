import { Schema, model, ObjectId } from "mongoose";

// mongoose schema for user
// registration and data query
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

export default model(process.env.COLLECTION, userSchema);
