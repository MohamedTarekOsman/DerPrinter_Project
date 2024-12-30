/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./HomeHeroSection.css";

function HomeHeroSection({ slidesData }) {
  console.log("SliderData", slidesData);

  return (
    <section className="hero-section">
      <div className="container">
        <Swiper
          slidesPerView={1}
          speed={1000}
          loop={true}
          modules={[EffectFade, Pagination]}
          // autoplay={{ delay: 9000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="hero-swiper"
        >
          {slidesData.map((slide, index) => 
            slide && ( // التحقق من أن الشريحة غير فارغة
              <SwiperSlide key={index}>
                <div className="row hero-row">
                  <div className="col-md-6 p-2">
                    <div className="headImg">
                      <img
                        src={slide.image}
                        className="animated-img"
                        alt="Slider Image"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 p-0 hero-txt">
                    <div className="hero-description">
                      <h1>{slide.title}</h1>
                      <p>{slide.description}</p>
                      <div className="links">
                        {slide.link && (
                          <Link
                            to={`/Category/${slide.link}`}
                            className="link"
                          >
                            Learn More
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </section>
  );
}

export default HomeHeroSection;
