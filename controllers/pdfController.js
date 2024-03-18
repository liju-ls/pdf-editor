import { PDFDocument } from "pdf-lib";
import fs from "fs";

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
  const pdfFilename = req.file.path;
  try {
    fs.readFile(pdfFilename, async (err, pdf) => {
      if (err) throw err;

      const pdfDoc = await PDFDocument.load(pdf);
      const newDoc = await PDFDocument.create();

      const extractPages = JSON.parse(req.body.pages);

      const copiedPages = await newDoc.copyPages(pdfDoc, extractPages);

      for (let i = 0; i < copiedPages.length; i++)
        newDoc.addPage(copiedPages[i]);

      const newFile = await newDoc.save();
      res.write(newFile);
      res.end();

      deleteFile(pdfFilename);
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
      const allPages = pdfDoc.getPages();

      const copiedPages = await newDoc.copyPages(pdfDoc, pageOrder);

      for (let i = 0; i < pageOrder.length; i++) {
        newDoc.addPage(copiedPages[i]);
      }

      const newFile = await newDoc.save();

      res.write(newFile);
      res.end();

      deleteFile(pdfFilename);
    });
  } catch (err) {
    console.log("Error : ", err);
  }
}
