import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loggedContext } from "../App";

function Login() {
  const [isLogged, setIsLogged] = useContext(loggedContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, [message]);

  // function responsible for send login
  // user data to server and set logged state
  async function handleLogin(e) {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    await fetch(`${import.meta.env.VITE_HOST}login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const result = await response.json();
        if (result.status == "success") {
          Cookies.set("token", result.token);
          setMessage(result.message + " Redirecting to Homepage.");
          setIsLogged(true);
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else setMessage(result.message);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  }

  function updateEmail(e) {
    setEmail(e.target.value);
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="d-flex justify-content-center my-5">
      <div className="card">
        <form className="p-5">
          <p className="fs-3 fw-bold">Welcome</p>

          {message && <p>{message}</p>}

          <div>
            <input
              onChange={updateEmail}
              className="form-control my-3"
              type="email"
              placeholder="Email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              title="Please enter a valid email."
              required
            />
          </div>
          <div>
            <input
              onChange={updatePassword}
              className="form-control"
              type="password"
              placeholder="Password"
              minLength={8}
              required
            />
          </div>
          <div className="my-3">
            <button
              onClick={handleLogin}
              className="btn btn-secondary text-center"
            >
              Login
            </button>
          </div>
          <p>
            Don't have an account? <a href="/register">Register</a>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
