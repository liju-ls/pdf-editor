import { useState, useEffect, useContext } from "react";
import { fileContext } from "../pages/Homepage";
import { FaFilePdf } from "react-icons/fa6";

function Files() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useContext(fileContext);

  // get all the user files initially
  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    await fetch(`${process.env.HOST}/files`, {
      method: "GET",
      credentials: "include",
    }).then(async (response) => {
      const fileNameArray = await response.json();
      setFiles(fileNameArray.files);
    });
  }

  // function responsible for get single
  // file from the user
  async function handleFile(filename) {
    await fetch(`${import.meta.env.VITE_HOST}file?filename=${filename}`, {
      method: "GET",
      credentials: "include",
    }).then(async (response) => {
      const pdfFile = await response.blob();
      setFile(pdfFile);
    });
  }

  // function resposible for rendering
  // user files in the page
  function renderFiles() {
    return files.map((item, index) => {
      return (
        <div
          key={index}
          className="p-1 rounded border d-flex gap-3 align-items-center my-2"
        >
          <FaFilePdf size={25} className="flex-grow-2" />
          <div className="text-start flex-grow-1">{item.fileName}</div>
          <button
            className="btn btn-danger flex-grow-2"
            onClick={() => {
              handleFile(item.fileNameServer);
            }}
          >
            Open
          </button>
        </div>
      );
    });
  }

  return (
    <div className="d-flex align-items-center flex-column p-4 text-center">
      <p className="fs-5 fw-bolder">Files</p>
      <div>
        <div>{files.length !== 0 ? renderFiles() : null}</div>
      </div>
    </div>
  );
}

export default Files;
