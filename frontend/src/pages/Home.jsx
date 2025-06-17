import React from "react";
import "../styles/home.css";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";

import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured_Tours/FeaturedTourList";
import MasonryImagesGallery from "../components/image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import NewsLetter from "../shared/NewsLetter";

function Home() {
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You GO"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Travelling opens the door to creating{" "}
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquam ab praesentium officia aliquid tempore distinctio
                  ipsam, eius doloremque perferendis laboriosam modi, hic
                  laudantium non. Aut magnam corporis quaerat dolores quia?
                </p>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="hero__img-box hero__video-box  mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
            <SearchBar />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </div>
            <ServiceList />
          </div>
        </div>
      </section>

      {/* ========== Feature section ========== */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mb-5">
            <Subtitle subtitle={"Explore"} />
            <h2 className="featured__tour-title">Our featured tours</h2>
          </div>
          <FeaturedTourList />
        </div>
      </div>
      {/* ========== Experience section ========== */}
      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-6">
            <div className="experience__content">
              <Subtitle subtitle={"Experience"} />

              <h2>
                With our all experience <br /> We will serve you
              </h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br />{" "}
                Quas aliquam, hic tempora inventore suscipit unde.
              </p>
            </div>
            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className="counter__box">
                <span>12k+</span>
                <h6>Successful Trips</h6>
              </div>
              <div className="counter__box">
                <span>2k+</span>
                <h6>Regular clients</h6>
              </div>
              <div className="counter__box">
                <span>15</span>
                <h6>Years experience</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="experience__img">
              <img src={experienceImg} alt="" />
            </div>
          </div>
        </div>
      </div>
      {/* ========== Gallery section ========== */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit our customers tour gallery
              </h2>
            </div>
            <div className="col-lg-12">
              <MasonryImagesGallery />
            </div>
          </div>
        </div>
      </section>
      {/* ========== Testimonial section ========== */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Subtitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">What our fans say about us</h2>
            </div>
            <div className="col-lg-12">
              <Testimonials />
            </div>
          </div>
        </div>
      </section>

      <NewsLetter />
    </>
  );
}

export default Home;
