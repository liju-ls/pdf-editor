import Express, { json } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import pdfRouter from "./routes/pdfRoutes.js";
import authRoute from "./routes/authenticationRoute.js";
import { Database } from "./services/databaseService.js";

const DB = new Database("mongodb://localhost:27017");
DB.connect();

const __dirname = path.dirname("/");

const app = Express();
app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.json());
app.use(cookieParser());

app.use(cors());

app.use("/", pdfRouter);
app.use("/", authRoute);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running at port : ", process.env.PORT);
});
