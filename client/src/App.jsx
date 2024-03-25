import { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";

// context for user logged state
export const loggedContext = createContext();

function App() {
  const [isLogged, setIsLogged] = useState(false);

  // check token and set user logged or not
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsLogged(true);
    } else {
      return setIsLogged(false);
    }
  }, []);

  return (
    <div className="vh-100">
      <loggedContext.Provider value={[isLogged, setIsLogged]}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage isLogged={isLogged} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </loggedContext.Provider>
    </div>
  );
}

export default App;
