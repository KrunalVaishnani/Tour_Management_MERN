import React, { useEffect, useState } from "react";
import CommonSection from "../shared/CommonSection";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";
import Card from "../shared/Card";
import NewsLetter from "../shared/NewsLetter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

function Admin() {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  return (
    <>
      <CommonSection title={"CRUD DATA"} />
      <section className="pt-2 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <button className="btn btn-success w-75 create-button" onClick={()=> navigate('/admin/addDetails')}>
                <span className="symbol" style={{color:"white"}}>➕</span> Create New
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-0 mt-2">
        <div className="container">
          {loading && (
            <h3 className="text-center pt-5 display-4">Loading....</h3>
          )}
          {error && <h3 className="text-center pt-5 display-4">{error}</h3>}
          {!loading && !error && (
            <div className="row ">
              {tours?.map((tour) => (
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={tour._id}>
                  <Card tour={tour} />
                </div>
              ))}

              <div className="col-lg-12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <NewsLetter />
    </>
  );
}

export default Admin;
