import mongoose from "mongoose";

export class Database {
  URI = null;

  constructor(URI) {
    this.URI = URI;
  }

  async connect() {
    mongoose
      .connect(this.URI, { serverSelectionTimeoutMS: 3000 })
      .catch((err) => {
        return console.log(err);
      });

    mongoose.connection.on("connected", () => {
      console.log("Database connected.");
    });

    mongoose.connection.on("Disconnected", () => {
      console.log("Database connected.");
    });
  }
}
