import { PDFDocument } from "pdf-lib";
import fs from "fs";

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
    });
  } catch (err) {
    console.log("error", err.name);
  }
}
