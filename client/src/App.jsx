import { useEffect, useState, createContext } from "react";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";

export const loggedContext = createContext();

function App() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsLogged(true);
      navigate("/account");
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
          <Route path="/account" element={<Account />} />
        </Routes>
      </loggedContext.Provider>
    </div>
  );
}

export default App;
