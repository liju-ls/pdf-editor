import { useState, useEffect } from "react";

function Files() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getFiles();
  }, []);

  async function getFiles() {
    await fetch("http://localhost:3001/files", {
      method: "GET",
      credentials: "include",
    }).then(async (response) => {
      const fileNameArray = await response.json();
      setFiles(fileNameArray.files);
    });
  }

  function renderFiles() {
    return files.map((item, index) => {
      return (
        <div key={index} className="mx-3 card p-4 gap-3">
          <p>PDF</p>
          <p className="text-wrap">{item.fileName}</p>
          <button className="btn btn-primary">Open</button>
        </div>
      );
    });
  }

  return (
    <div className="p-4">
      <p className="fs-5 fw-bolder text-center">Files</p>
      <div className="d-flex">{files.length !== 0 ? renderFiles() : null}</div>
    </div>
  );
}

export default Files;
