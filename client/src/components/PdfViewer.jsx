import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// javascipt worker for loading pdf file
// wihtout disturbing main thread
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function PdfViewer({ file, add, remove, enableBtn }) {
  const [pageNum, setPageNum] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const pageElements = [];

  // set pagenumber state once pdf loaded
  function handlePdfLoad({ numPages }) {
    setPageNum(numPages);
    setPageLoaded(true);
    enableBtn();
  }

  // return page element for
  // each page in the pdf
  function renderPages() {
    for (let i = 0; i < pageNum; i++) {
      pageElements.push(
        <div key={i + 1}>
          <input
            data-page={i + 1}
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                add(e.target.dataset.page);
              } else {
                remove(e.target.dataset.page);
              }
            }}
          />
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
      <Document
        loading="PDF Loading..."
        noData={"<--- PDF Display --->"}
        className="m-5 d-flex flex-wrap gap-5 justify-content-center"
        onLoadSuccess={handlePdfLoad}
        file={file !== null ? file : null}
      >
        {pageLoaded ? renderPages() : null}
      </Document>
    </div>
  );
}

export default PdfViewer;
