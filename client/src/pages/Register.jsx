import { useState } from "react";

function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);

  // function responsible for sending registeration
  // user data to server
  async function handleRegister(e) {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    await fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (reponse) => {
        const result = await reponse.json();
        setMessage(result.message);
      })
      .catch((err) => {
        setMessage(err.message);
      });
  }

  // update email state
  function updateEmail(e) {
    setEmail(e.target.value);
  }

  // update password state
  function updatePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="d-flex justify-content-center my-5">
      <div className="card">
        <form className="p-5">
          <p className="fs-3 fw-bold">Create an Account</p>

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
            <div className="form-text">Password must be 8 characters</div>
          </div>
          <div className="my-3">
            <button
              onClick={handleRegister}
              className="btn btn-secondary text-center"
            >
              Register
            </button>
          </div>
          <p>
            Already have an account? <a href="/login">Login</a>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
