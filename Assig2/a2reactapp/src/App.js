import './App.css';
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                  <Link className="navbar-brand" to="/">Home</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <div className="navbar-nav">
                          <Link className="nav-link active" to="/Test" >Test</Link>
                          <Link className="nav-link" to="/Region" >Region</Link>
                          <Link className="nav-link" to="/Country" >Country</Link>
                      </div>
                  </div>
              </div>
          </nav>
          <Outlet />
      </div>
  );
}

export default App;
