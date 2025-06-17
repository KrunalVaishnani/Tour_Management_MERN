import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import './admin-header.css'


function AdminHeader({title}) {
  return (
    <header className="header__admin mb-0">
      <div className="container">
        <div className="row">
          <div className="nav__wrapper mt-2 d-flex align-items-center justify-content-beetween">
            <Link to={"/"} className="logo__img d-flex justify-content-center">
              <img src={logo} />
            </Link>

            <div className="navigation w-100">
              <p className="display-3 mb-0">{title}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
