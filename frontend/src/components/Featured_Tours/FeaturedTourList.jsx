import React from "react";
import tourData from "../../assets/data/tours";
import TourCard from "../../shared/TourCard";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

function FeaturedTourList() {
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);
  // console.log(featuredTours);

  return (
    <>
      {loading && <h3 className="display-4">Loading....</h3>}
      {error && <h3 className="display-4">{error}</h3>}
      {!loading &&
        !error &&
        featuredTours?.map((tour) => (
          <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </div>
        ))}
    </>
  );
}

export default FeaturedTourList;
