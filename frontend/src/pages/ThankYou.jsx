import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/thank-you.css";

function ThankYou() {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb-4">Your Tour is Booked.</h3>

              <Button className="btn primary__btn w-25">
                <Link to={"/home"}>Back To Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThankYou;
