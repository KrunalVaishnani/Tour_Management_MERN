import React, { useState, useEffect } from "react";
import AdminHeader from "../components/Header/AdminHeader";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../styles/add-edit-tour.css";
import { BASE_URL } from "../utils/config";
import { toast } from "react-toastify";

function AddEditTour() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isForEdit = !!id;

  const [data, setData] = useState({
    title: "",
    city: "",
    address: "",
    desc: "",
    distance: 0,
    price: 0,
    maxGroupSize: 0,
    photo: "",
    featured: false,
  });

  useEffect(() => {
    if (isForEdit) {
      // Fetch the existing tour details
      const fetchTourDetails = async () => {
        try {
          const res = await fetch(`${BASE_URL}/tours/${id}`);
          const result = await res.json();

          if (!res.ok) {
            return toast.error(result.message);
          }

          setData({
            title: result.data.title,
            city: result.data.city,
            address: result.data.address,
            desc: result.data.desc,
            distance: result.data.distance,
            price: result.data.price,
            maxGroupSize: result.data.maxGroupSize,
            photo: result.data.photo,
            featured: result.data.featured,
          });
        } catch (error) {
          console.error("Error fetching tour details:", error);
        }
      };

      fetchTourDetails();
    }
  }, [isForEdit, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if the file size exceeds 5MB (or your limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds the limit of 5MB");
      return;
    }

    // If the file size is acceptable, continue processing
    setData({ ...data, photo: file });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "distance" || id === "price" || id === "maxGroupSize") {
      setData({ ...data, [id]: Number(value) });
    } else {
      setData({ ...data, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("city", data.city);
    formData.append("address", data.address);
    formData.append("desc", data.desc);
    formData.append("distance", data.distance);
    formData.append("price", data.price);
    formData.append("maxGroupSize", data.maxGroupSize);
    formData.append("featured", data.featured);
    const photoInput = document.getElementById("photo").files[0];
    if (!isForEdit || (isForEdit && photoInput)) {
      formData.append("photo", photoInput);
    }

    try {
      const url = isForEdit ? `${BASE_URL}/tours/${id}` : `${BASE_URL}/tours`;
      const method = isForEdit ? "PUT" : "POST"; // Use PUT for editing

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }

      toast.success(result.message);
      navigate("/admin");
    } catch (error) {
      console.error(
        isForEdit ? "Update Tour ERR" : "Create Tour ERR",
        error.message
      );
    }
  };

  return (
    <>
      <AdminHeader title={isForEdit ? "Edit Tour Details" : "Add New Tour"} />
      <div className="detail__container d-flex justify-content-between">
        <div className="detail__form">
          <h2>{isForEdit ? "Edit Details" : "Add Details"}</h2>

          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Beautiful Sunrise, Thailand"
                onChange={handleChange}
                value={data.title}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="City"
                onChange={handleChange}
                value={data.city}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
                onChange={handleChange}
                value={data.address}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="desc"
                placeholder="Description"
                onChange={handleChange}
                value={data.desc}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Distance (km)</label>
              <input
                type="text"
                className="form-control"
                id="distance"
                onChange={handleChange}
                value={data.distance}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Price ($)</label>
              <input
                type="text"
                className="form-control"
                id="price"
                onChange={handleChange}
                value={data.price}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Max Group Size</label>
              <input
                type="text"
                className="form-control"
                id="maxGroupSize"
                onChange={handleChange}
                value={data.maxGroupSize}
                required
              />
            </div>
            <div className="row my-3">
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                <div className="form-check ps-0">
                  <label className="form-label">Upload Image</label>
                  <input
                    className="form-control"
                    type="file"
                    id="photo"
                    onChange={handleFileChange}
                    required={!isForEdit} // Only required for adding a new tour
                  />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center p-0">
                <div className="form-check w-50 ps-0">
                  <label className="form-label">Featured</label>
                  <div className="d-flex align-items-center">
                    <div className="form-check me-3">
                      <input
                        className="form-check-input custom-checkbox"
                        type="radio"
                        name="featured"
                        id="featuredTrue"
                        value={true}
                        checked={data.featured === true}
                        onChange={() => setData({ ...data, featured: true })}
                      />
                      <label className="form-check-label ms-2">True</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input custom-checkbox"
                        type="radio"
                        name="featured"
                        id="featuredFalse"
                        value={false}
                        checked={data.featured === false}
                        onChange={() => setData({ ...data, featured: false })}
                      />
                      <label className="form-check-label ms-2">False</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-center">
              <Button
                className="btn secondary__btn submit__btn mt-3"
                type="submit"
              >
                {isForEdit ? "Update" : "Add"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEditTour;
