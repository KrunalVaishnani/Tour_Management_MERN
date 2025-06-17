import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const quick__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];
const quick__links2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
              inventore?
            </p>

            <div className="social__links d-flex align-items-center gap-4">
              <span>
                <Link to="#">
                  <i className="ri-youtube-line"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-github-fill"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-facebook-circle-line"></i>
                </Link>
              </span>
              <span>
                <Link to="#">
                  <i className="ri-instagram-line"></i>
                </Link>
              </span>
            </div>
            {/* </div> */}
          </div>
          <div className="col-lg-3">
            <h5 className="footer__link-title">Discover</h5>
            <div className="list-group footer__quick-links">
              {quick__links.map((item, index) => (
                <div className="list-group-item p-0 border-0 my-2" style={{backgroundColor:"transparent"}} key={index}>
                  <Link id="1" to={item.path}>
                    {item.display}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3">
            <h5 className="footer__link-title">Quick Links</h5>
            <div className="list-group footer__quick-links">
              {quick__links2.map((item, index) => (
                <div className="list-group-item p-0 border-0 my-2" style={{backgroundColor:"transparent"}} key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3">
            <h5 className="footer__link-title">Contact</h5>
            <div className="list-group footer__quick-links">
              <div className="list-group-item p-0 border-0 my-2 d-flex align-items-center gap-3" style={{backgroundColor:"transparent"}}>
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-map-pin-line"></i></span>
                  Address: 
                </h6>
                <p className="mb-0">Rajkot , Gujarat</p>
              </div>
              <div className="list-group-item p-0 border-0 my-2 d-flex align-items-center gap-3" style={{backgroundColor:"transparent"}}>
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-mail-line"></i></span>
                  Email: 
                </h6>
                <p className="mb-0">kevalajani@gmail.com</p>
              </div>
              <div className="list-group-item p-0 border-0 my-2 d-flex align-items-center gap-3" style={{backgroundColor:"transparent"}}>
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-phone-fill"></i></span>
                  Phone: 
                </h6>
                <p className="mb-0">+91 1234567890</p>
              </div>
            </div>
          </div>
          <div className="coll-lg-12 text-center pt-5">
            <p className="copyright">
              Copyright © {new Date().getFullYear()} By Keval Ajani
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
