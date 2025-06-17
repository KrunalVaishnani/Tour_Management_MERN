import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "react-bootstrap";
import "./card.css";

function TCard({tour}) {
  const { _id, title, city, photo } = tour;


  return (
    <div className="tour__card">
      <Link to={`/admin/details/${_id}`}>
        <Card>
          <div className="tour__img">
            <img src={photo} alt="" />
          </div>
          <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
              <span className="tour__location d-flex align-items-center gap-1">
                <i className="ri-map-pin-line"></i>
                {city}
              </span>
            </div>
            <h5 className="tour__title">
              <Link to={`/admin/details/${_id}`}>{title}</Link>
            </h5>

            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              
              <button className="view-button">
                <Link to={`/admin/details/${_id}`}>View Details</Link>
              </button>
              <button className="edit__btn">
                <Link to={`/admin/updateDetails/${_id}`}>Edit Details</Link>
              </button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
}

export default TCard;
