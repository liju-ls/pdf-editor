import { PDFDocument } from "pdf-lib";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import userModel from "../models/user.js";

// file, dir, upload paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, "../public/usersFiles/");

// get server filename and return the file
export async function getOne(req, res) {
  const filename = req.query.filename;

  try {
    fs.readFile(uploadPath + filename, async (err, data) => {
      if (err) throw err;
      const pdfDoc = await PDFDocument.load(data);
      const pdfFile = await pdfDoc.save();
      res.status(200).setHeader("Content-Type", "application/pdf").end(pdfFile);
    });
  } catch (err) {
    console.log(err);
  }
}

// get token and query files in database
// return the filename array
export async function getAll(req, res) {
  if (req.logged) {
    const email = req.email;
    try {
      userModel.findOne({ email: email }).then((user) => {
        const fileNameArray = user.files;
        return res
          .status(200)
          .json({ status: "success", files: fileNameArray });
      });
    } catch (err) {
      console.log(err);
    }
  }
}

// delete input file
function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
}

// handle extract pages from pdf and
// create and return a new pdf
export async function extractPdfPages(req, res) {
  const pdfPath = req.file.path;

  try {
    fs.readFile(pdfPath, async (err, pdf) => {
      if (err) throw err;

      const pdfDoc = await PDFDocument.load(pdf);
      const newDoc = await PDFDocument.create();

      let pageNumber = JSON.parse(req.body.pages);
      pageNumber = pageNumber.map((item) => item - 1);

      const copiedPages = await newDoc.copyPages(pdfDoc, pageNumber);

      for (let i = 0; i < copiedPages.length; i++)
        newDoc.addPage(copiedPages[i]);

      const newFile = await newDoc.save();

      res.setHeader("Content-Type", "application/pdf");
      res.end(newFile);

      loggedFileHandler(req, userModel);
    });
  } catch (err) {
    console.log("Error : ", err);
  }
}

// handle change order of pages in pdf and
// return a new pdf with changed order
export async function changePdfOrder(req, res) {
  const pdfFilename = req.file.path;
  try {
    fs.readFile(pdfFilename, async (err, pdf) => {
      if (err) throw err;

      const pdfDoc = await PDFDocument.load(pdf);
      const newDoc = await PDFDocument.create();

      const pageOrder = JSON.parse(req.body.order);

      const copiedPages = await newDoc.copyPages(pdfDoc, pageOrder);

      for (let i = 0; i < pageOrder.length; i++) {
        newDoc.addPage(copiedPages[i]);
      }

      const newFile = await newDoc.save();

      res.write(newFile);
      res.end();

      loggedFileHandler(req, userModel);
    });
  } catch (err) {
    console.log("Error : ", err);
  }
}

// save pdf file only if user logged other wise
// delete the file from server

async function loggedFileHandler(reqObject, model) {
  const pdfPath = reqObject.file.path;

  if (reqObject.logged) {
    model.findOne({ email: reqObject.email }).then((user) => {
      const fileNameServer = `${user._id}-${user.files.length}.pdf`;
      const files = [...user.files];
      const newFile = {
        fileName: reqObject.file.originalname,
        fileNameServer: fileNameServer,
      };
      files.push(newFile);

      user.files = files;
      user.save();

      fs.copyFile(pdfPath, `${uploadPath}${fileNameServer}`, (err) => {
        if (err) return console.log(err);

        deleteFile(pdfPath);
      });
    });
  } else {
    deleteFile(pdfPath);
  }
}
