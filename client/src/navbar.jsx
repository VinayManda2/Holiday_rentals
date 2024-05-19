import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

const Navbar = () => {
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const storedUserid = localStorage.getItem("userid");
    setUserid(storedUserid);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove the userid from localStorage
        localStorage.removeItem("userid");
        localStorage.removeItem("username");
        setUserid(null);
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-body-light border-bottom sticky-top ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/api/listings">
          <i className="fa-regular fa-compass"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/api/listings">
              Explore
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <form className="d-flex">
              <input
                className="form-control me-2 rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-search rounded-pill border"
                type="submit"
              >
                <i className="fa-solid fa-magnifying-glass"></i> search
              </button>
            </form>
          </div>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/api/listings/new">
              Add New Listing
            </Link>
            {userid ? (
              <button className="nav-link" onClick={handleLogout}>
                <b>Logout</b>
              </button>
            ) : (
              <Link className="nav-link" to="/api/login">
                <b>Login</b>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
