function Navbar() {
  return (
    <div className="border">
      <div className="container navbar navbar-expand-lg justify-content-between">
        <p className="navbar-brand">PDF EDITOR</p>
        <nav>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/register">
                Register
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
