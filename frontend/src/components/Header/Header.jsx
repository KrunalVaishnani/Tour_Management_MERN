import React, { useRef, useEffect, useContext } from "react";
import logo from "../../assets/images/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Header.css";
import { AuthContext } from "../../context/AuthContext";

const nav__links = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About" },
  { path: "/tours", display: "Tours" },
  { path: "/admin", display: "Admin" },
];

function Header() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFn = () => {
    if (headerRef.current) {
      if (
        document.body.scrollTop > 55 ||
        document.documentElement.scrollTop > 55
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFn);

    // Cleanup to remove the event listener
    return () => {
      window.removeEventListener("scroll", stickyHeaderFn);
    };
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("show__menu");
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="row">
          <div className="nav__wrapper d-flex align-items-center justify-content-beetween">
            <Link to="/" className="logo">
              <img src={logo} alt="Logo" />
            </Link>

            <div ref={menuRef} className="navigation">
              <ul className="menu d-flex justify-content-center align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                      to={item.path}
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__right d-flex justify-content-end align-items-center flex-grow-1">
              <div className="nav__btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0 text-danger">{user.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="login__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn register__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <span className="mobile_menu mx-3" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
