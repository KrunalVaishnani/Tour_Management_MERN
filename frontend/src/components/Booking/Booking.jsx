import React, { useState, useContext, useEffect } from "react";
import "./booking.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config.js";
import { toast } from "react-toastify";

function Booking({ tour, avgRating }) {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 0,
    bookAt: "",
  });
  const [totalAmount, SetTotalAmount] = useState(0);
  const handleChange = (e) => {
    const { id, value } = e.target;

    // For guestSize, allow "0" but ensure only numeric values
    if (id === "guestSize") {
      const guestSize = value === "" ? 0 : parseInt(value, 10);
      setBooking((prev) => ({ ...prev, [id]: guestSize }));
    } else {
      setBooking((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleKeyPress = (e) => {
    // Allow only number keys (0-9)
    const charCode = e.charCode || e.keyCode;

    // Check if the pressed key is not a digit (0-9)
    if (charCode < 48 || charCode > 57) {
      e.preventDefault(); // Prevent non-numeric input
    }
  };

  const serviceFee = 10;
  useEffect(() => {
    if (booking.guestSize === 0 || !booking.guestSize) {
      SetTotalAmount(0);
    } else {
      SetTotalAmount(
        Number(price) * Number(booking.guestSize) + Number(serviceFee)
      );
    }
  }, [booking.guestSize]);

  const handleClick = async (e) => {
    e.preventDefault();

    console.log(booking);

    try {
      if (!user || user === undefined || user === null) {
        return toast.error("Please Sign in");
      }
      if (
        booking.fullName === "" ||
        booking.phone === "" ||
        booking.guestSize <= 0 ||
        booking.bookAt === ""
      ) {
        return toast.warning("All Fields are Required");
      }
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return toast.error(result.message);
      }
      navigate("/thank-you");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/* =========== Booking Form ===========*/}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-group d-flex align-items-center gap-3 mb-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              min={1}
            />
          </div>
        </Form>
      </div>

      <div className="booking__bottom">
        <div className="list-group">
          <div className="list-group-item border-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line"></i> 1 person
            </h5>
            <span> ${price}</span>
          </div>
          <div className="list-group-item border-0">
            <h5>Service Charge</h5>
            <span> ${serviceFee}</span>
          </div>
          <div className="list-group-item border-0 total">
            <h5>Total Charge</h5>
            <span> ${totalAmount}</span>
          </div>
        </div>
        <Button
          className="btn primary__btn w-100 mt-4"
          onClick={handleClick}
          type="submit"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}

export default Booking;
