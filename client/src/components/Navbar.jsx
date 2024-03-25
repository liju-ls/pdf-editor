import Cookies from "js-cookie";
import { useContext } from "react";
import { loggedContext } from "../App";

function Navbar() {
  const [isLogged, setIsLogged] = useContext(loggedContext);

  return (
    <div className="border">
      <div className="container navbar navbar-expand-lg justify-content-between">
        <p className="navbar-brand">PDF EDITOR</p>
        <nav>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            {/* show login and register 
                button only when not logged */}
            {!isLogged ? (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            ) : null}

            {!isLogged ? (
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            ) : null}
            {/* show logout button 
                only when logged */}
            {isLogged ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href=""
                  onClick={() => {
                    setIsLogged(false);
                    Cookies.remove("token");
                  }}
                >
                  Logout
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
