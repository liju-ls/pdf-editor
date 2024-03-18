import express from "express";
import { extractPdfPages } from "../controllers/pdfController.js";
import upload from "../middlewares/upload.js";

const router = express.Router()

router.post("/extract-pages", upload.single("file"), extractPdfPages);

export default router;
