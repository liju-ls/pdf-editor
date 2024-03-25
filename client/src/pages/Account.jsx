import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import Files from "../components/Files";
import { loggedContext } from "../App";

function Account() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useContext(loggedContext);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!isLogged) navigate("/");
    console.log(isLogged);
  }, [isLogged]);

  async function handleFile(filename) {
    await fetch(`http://localhost:3001/file?filename=${filename}`, {
      method: "GET",
      credentials: "include",
    }).then(async (response) => {
      const pdfFile = await response.blob();
      setFile(pdfFile);
    });
  }

  return (
    <>
      {!file && isLogged ? <Files handleFile={handleFile} /> : null}
      {file ? <Editor pdfFile={file} /> : null}
    </>
  );
}

export default Account;
