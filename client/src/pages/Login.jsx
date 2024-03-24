import Cookies from "js-cookie";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);

  async function handleRegister(e) {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    await fetch("http://localhost:3001/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const result = await response.json();
        Cookies.set("token", result.token);
        setMessage(result.message);
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

          {message ? <p>{message}</p> : null}

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
              onClick={handleRegister}
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
