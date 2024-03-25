import Express, { json } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import pdfRouter from "./routes/pdfRoutes.js";
import authRoute from "./routes/authenticationRoute.js";
import { Database } from "./services/databaseService.js";

const __dirname = path.dirname("/");

// database connection
const DB = new Database(`mongodb://localhost:27017/${process.env.DATABASE}`);
DB.connect();

const app = Express();
app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.json());
app.use(cookieParser());

// cors setup
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use("/", pdfRouter);
app.use("/", authRoute);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running at port : ", process.env.PORT);
});
