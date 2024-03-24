import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function PdfViewer() {
  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const pageElements = [];

  function handleUpload(e) {
    setPdf(e.target.files[0]);
  }

  function handlePdfLoad({ numPages }) {
    console.log(numPages);
    setPageNum(numPages);
    setPageLoaded(true);
  }

  function renderPages() {
    for (let i = 0; i < pageNum; i++) {
      pageElements.push(
        <div>
          <input type="checkbox" />
          <Page id="page" scale={0.4} className="border" pageNumber={i + 1} />
          <label className="mt-2" htmlFor="page">
            {i + 1}
          </label>
        </div>
      );
    }
    return pageElements;
  }

  return (
    <div className="mt-5 text-center">
      <input type="file" onChange={handleUpload} />
      <Document
        className="m-5 d-flex flex-wrap gap-5 justify-content-center"
        onLoadSuccess={handlePdfLoad}
        file={pdf !== null ? pdf : null}
      >
        {pageLoaded ? renderPages() : null}
      </Document>
    </div>
  );
}

export default PdfViewer;
