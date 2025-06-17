import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/card-details.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import NewsLetter from "../shared/NewsLetter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";
import AdminHeader from "../components/Header/AdminHeader";

function CardDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const { photo, title, desc, price, address, city, distance, maxGroupSize } =
    tour;

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (!res.ok) {
        return toast.error(result.message);
      }
      toast.success(result.message);
      navigate("/admin");
    } catch (error) {
      console.log("Delete ERR : ", error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <AdminHeader title={"Tour Details"} />
      <section className="pt-5 pb-3">
        <div className="container">
          {loading && <h3 className="display-4">Loading....</h3>}
          {error && <h3 className="display-4">{error}</h3>}
          {!loading && !error && (
            <div className="row gap-3">
              <div className="col-lg-7">
                <div className="tour__img">
                  <img src={photo} alt="" />
                </div>
              </div>
              <div className="tour__information col-lg">
                <h2>{title}</h2>

                <div className="d-flex align-items-center gap-5">
                  <span>
                    <i className="ri-map-pin-user-fill"></i>
                    {address}
                  </span>
                </div>
                <div className="tour__extra-info d-flex justify-content-evenly">
                  <span>
                    <i className="ri-map-pin-2-line"></i>
                    {city}
                  </span>
                  <span>
                    <i className="ri-money-dollar-circle-line"></i>${price} /per
                    person
                  </span>
                </div>
                <div className="tour__extra-info d-flex justify-content-evenly">
                  <span>
                    <i className="ri-map-pin-time-line"></i>
                    {distance} k/m
                  </span>
                  <span>
                    <i className="ri-group-line"></i>
                    {maxGroupSize} people
                  </span>
                </div>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="pt-0 gap-3 d-flex align-items-center justify-content-center mt-3">
        <button className="back-button" onClick={() => navigate("/admin")}>
          <span className="symbol">⬅️</span> Back
        </button>

        <button
          className="edit-button"
          onClick={() => navigate(`/admin/updateDetails/${id}`)}
        >
          <span className="symbol">✏️</span>
          Edit
        </button>

        <button className="delete-button" onClick={handleDelete}>
          <span className="symbol">🗑️</span>
          Delete
        </button>
      </section>
      <NewsLetter />
    </>
  );
}

export default CardDetail;
