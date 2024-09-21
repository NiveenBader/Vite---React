import { Link, NavLink } from "react-router-dom";
import Logo from "./logo";
import { useAuth } from "../contexts/auth.context";
import { useState, useEffect } from "react";
import { useMode } from "../contexts/mode.context";
import Search from "./common/search";

function NavBar() {
  const { theme, setٌTheme } = useMode();
  const { user, getLoggedUser } = useAuth();
  const [loggedUser, setLoggedUser] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchUser = async () => {
      try {
        const fetcData = await getLoggedUser(user._id);
        const userData = fetcData.data;
        setLoggedUser(userData.image.url);
        setImageAlt(userData.image.alt);
        setName(userData.name.first);
      } catch (error) {
        console.error("error fetching cards ", error);
      }
    };
    fetchUser();
  }, [user, getLoggedUser]);

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setٌTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const handleClicked = (e) => {
    const element = e.currentTarget;
    if (element.classList.contains("show")) {
      element.classList.remove("show");
    } else {
      element.classList.add("show");
    }
  };
  return (
    <nav
      className="navbar navbar-expand-sm navbar-light fixed-top bg-success shadow-sm fs-4 fw-bold"
      aria-label="Fifth navbar example"
    >
      <div className="container ">
        <Link to="/" className="navbar-brand">
          <Logo />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample05"
          aria-controls="navbarsExample05"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon  "></span>
        </button>

        <div
          onClick={handleClicked}
          className="collapse navbar-collapse "
          id="navbarsExample05"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4 ">
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <NavLink to="/favourites" className="nav-link">
                    Fav Cards
                  </NavLink>
                </li>
                {(user.isBusiness || user.isAdmin) && (
                  <li className="nav-item">
                    <NavLink to="/mycards" className="nav-link">
                      MY Cards
                    </NavLink>
                  </li>
                )}
                {user.isAdmin && (
                  <li className="nav-item">
                    <NavLink to="/CRM" className="nav-link">
                      CRM
                    </NavLink>
                  </li>
                )}
              </>
            )}
          </ul>

          <Search onClick={(e) => e.stopPropagation()} />

          <span className="visually-hidden" id="bd-theme-text">
            Toggle theme
          </span>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-4 ">
            <button
              onClick={handleToggle}
              className="border-0 bg-success mt-2  "
              style={{ width: 50 }}
            >
              {theme === "dark" ? (
                <i className="bi bi-moon-fill fs-3 m-2"></i>
              ) : (
                <i className="bi bi-sun fs-3 m-2"></i>
              )}
            </button>

            {user ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-4">
                <li className="nav-item">
                  <Link
                    to={`/referredUser/${user._id}`}
                    className="dropdown-item"
                  >
                    <img
                      src={loggedUser}
                      alt={imageAlt}
                      style={{ width: 38, height: 38 }}
                      className="rounded-circle mt-3 "
                    />
                  </Link>
                </li>

                <li className="nav-item">
                  <NavLink to="/sign-out" className="nav-link m-2">
                    Sign Out
                  </NavLink>
                </li>
              </ul>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/sign-in" className="nav-link">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/sign-up" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
