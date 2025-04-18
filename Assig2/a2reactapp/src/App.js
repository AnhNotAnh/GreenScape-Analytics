import './App.css';
import { Link, Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-globe me-2" style={{ fontSize: '1.4rem' }}></i>
            <span className="fw-bold">Green Scape Analytics</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link ${path === '/' || path === '/Home' ? 'active fw-bold' : ''}`} to="Home">
                  <i className="bi bi-house-door me-1"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${path === '/Region' ? 'active fw-bold' : ''}`} to="Region">
                  <i className="bi bi-globe-americas me-1"></i> Regions
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${path.startsWith('/Country') ? 'active fw-bold' : ''}`} to={"Country/" + 0}>
                  <i className="bi bi-flag me-1"></i> Countries
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <Outlet />
      </div>
      <footer className="bg-light py-3 mt-5">
        <div className="container text-center">
          <small className="text-muted">&copy; 2025 Green Scape Analytics - Environmental Data Explorer</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
