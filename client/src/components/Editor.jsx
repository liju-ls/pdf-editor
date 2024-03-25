import { useContext, useEffect, useState } from "react";
import PdfViewer from "../components/PdfViewer";
import { fileContext } from "../pages/Homepage";

function Editor() {
  const [file, setFile] = useContext(fileContext);
  const [editedFile, setEditedFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState(null);
  const pages = [];

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error]);

  // enable extract button when pdf loaded
  function handleEnableBtn() {
    setIsDisabled(false);
  }

  // set pdf file in file state
  function handleFileUpload(e) {
    setFile(e.target.files[0]);
  }

  // add page number to pages array
  function addPage(page) {
    pages.push(page);
  }

  // remove page number to pages array
  function removePage(page) {
    const index = pages.indexOf(page);
    pages.splice(index, 1);
  }

  // function responsible for send pdf and
  // no of pages info to server and
  // get back a extracted pdf
  async function handleExtractPage() {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pages", JSON.stringify(pages));

    await fetch("http://localhost:3001/extract-pages", {
      method: "post",
      body: formData,
      credentials: "include",
    })
      .then(async (response) => {
        if (response.status == 200) {
          const pdf = await response.blob();
          setEditedFile(pdf);
        } else {
          const result = await response.json();
          setError(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="text-center m-4 d-flex flex-grow-1 justify-content-center">
        <button
          onClick={handleExtractPage}
          disabled={isDisabled}
          className="me-4 btn btn-primary"
        >
          Extract Pages
        </button>
        <input
          className="form-control w-25"
          type="file"
          onChange={(e) => {
            handleFileUpload(e);
          }}
        />
      </div>

      {error && (
        <div className="text-danger text-capitalize text-center">{error}</div>
      )}

      <div className="d-flex">
        <div className="border-end flex-grow-1">
          <PdfViewer
            file={file}
            add={addPage}
            remove={removePage}
            enableBtn={handleEnableBtn}
          />
        </div>
        <div className="flex-grow-2 text-center">
          {editedFile !== null && (
            <button
              className="btn btn-sm btn-danger"
              // function responsible for open new window
              // and open pdf file on it
              onClick={() => {
                const newWindow = window.open();
                newWindow.location.href =
                  window.URL.createObjectURL(editedFile);
              }}
            >
              Download
            </button>
          )}
          {file !== null && (
            <PdfViewer
              file={editedFile}
              add={addPage}
              remove={removePage}
              enableBtn={handleEnableBtn}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Editor;
