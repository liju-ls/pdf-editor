import { useContext, useState, createContext } from "react";
import Editor from "../components/Editor";
import Files from "../components/Files";
import { loggedContext } from "../App";

export const fileContext = createContext();

function Homepage() {
  const [isLogged, setIsLogged] = useContext(loggedContext);
  const [file, setFile] = useState(null);

  return (
    // context provider for the file context
    <fileContext.Provider value={[file, setFile]}>
      <div className="d-flex flex-column">
        <Editor />
        {isLogged && !file && <Files />}
      </div>
    </fileContext.Provider>
  );
}

export default Homepage;
