import express from "express";
import {
  extractPdfPages,
  changePdfOrder,
  getAll,
  getOne,
} from "../controllers/pdfController.js";
import upload from "../middlewares/upload.js";
import { authorization } from "../middlewares/authorization.js";

const router = express.Router();
// route to get one file
router.get("/file", authorization, getOne);

// route to get all files
router.get("/files", authorization, getAll);

// route to extract page
router.post(
  "/extract-pages",
  upload.single("file"),
  authorization,
  extractPdfPages
);

// route to change page order in pdf
router.post(
  "/change-order",
  upload.single("file"),
  authorization,
  changePdfOrder
);

export default router;
