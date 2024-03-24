import { useState } from "react";
import PdfViewer from "../components/PdfViewer";

function Editor() {
  const [file, setFile] = useState(null);
  const [editedFile, setEditedFile] = useState(null);
  const [isDisabled, setIsDisable] = useState(true);
  const pages = [];

  function handleFileUpload(e) {
    setFile(e.target.files[0]);
    setIsDisable(false);
  }

  function addPage(page) {
    pages.push(page);
    console.log(pages);
  }

  function removePage(page) {
    const index = pages.indexOf(page);
    pages.splice(index, 1);
    console.log(pages);
  }

  async function handleExtractPage() {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pages", JSON.stringify(pages));

    console.log(pages);

    await fetch("http://localhost:3001/extract-pages", {
      method: "post",

      body: formData,
    }).then(async (response) => {
      const a = await response.blob();
      setEditedFile(a);
    });
  }

  return (
    <>
      <div className="text-center m-4">
        <button
          onClick={handleExtractPage}
          disabled={isDisabled}
          className="me-4 btn btn-primary"
        >
          Extract Pages
        </button>
        <input
          type="file"
          onChange={(e) => {
            handleFileUpload(e);
          }}
        />
      </div>
      <div className="d-flex">
        <div className="border-end w-50">
          <PdfViewer file={file} add={addPage} remove={removePage} />
        </div>
        <div className="2-50">
          {editedFile ? (
            <button
              onClick={() => {
                const newWindow = window.open();
                newWindow.location.href =
                  window.URL.createObjectURL(editedFile);
              }}
            >
              Download
            </button>
          ) : null}
          <PdfViewer file={editedFile} add={addPage} remove={removePage} />
        </div>
      </div>
    </>
  );
}

export default Editor;
