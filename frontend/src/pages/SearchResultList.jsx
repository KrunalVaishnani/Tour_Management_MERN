import React, { useState } from "react";
import CommonSection from "../shared/CommonSection";
import TourCard from "./../shared/TourCard";
import { useLocation } from "react-router-dom";
import NewsLetter from '../shared/NewsLetter'

function SearchResultList() {
  const location = useLocation();
  const [data] = useState(location.state);

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section className="">
        <div className="container ">
          <div className="row ">
            {data.length == 0 ? (
              <h3 className="text-center display-3">No Tour Found</h3>
            ) : (
              data?.map((tour) => (
                <div className="col-lg-3 mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <NewsLetter />
    </>
  );
}

export default SearchResultList;
