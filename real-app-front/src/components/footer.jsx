import Logo from "./logo";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
function Footer() {
  const { user } = useAuth();

  return (
    <footer className="d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-top gap-4">
      <div>
        <Link to="/" className="navbar-brand">
          <Logo />
          <span className="mx-2">&copy;</span>

          <span>{new Date().getFullYear()}</span>
        </Link>
      </div>
      <div className="d-flex justify-content-evenly ">
        <div className="nav-item fs-3 m-2">
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </div>
        {user && (
          <div className="nav-item fs-3 m-2">
            <NavLink to="/favourites" className="nav-link">
              Fav Cards
            </NavLink>
          </div>
        )}
        {user && (user.isBusiness || user.isAdmin) && (
          <div className="nav-item fs-3 m-2">
            <NavLink to="/mycards" className="nav-link">
              MY Cards
            </NavLink>
          </div>
        )}
        {user && user.isAdmin && (
          <div className="nav-item fs-3 m-2">
            <NavLink to="/CRM" className="nav-link">
              CRM
            </NavLink>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
