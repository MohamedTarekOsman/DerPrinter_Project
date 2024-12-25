import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./ProductsSlider.css";
import { fetchData } from "../../../Utils/GetApi";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  
    useEffect(() => {
      async function loadProducts() {
        const data = await fetchData("products");
        setProducts(data);
      }
  
      loadProducts();
    }, []);

    useEffect(()=>{
      console.log(products)
    },[products])

  return (
    <div className="best-seller px-10 py-20">
      <div className="tex text-center prod-list-title">
        <h2>Bestseller</h2>
      </div>
      <Swiper
        modules={[EffectCoverflow, Pagination]}
        // effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true} 
        loop={true} 
        spaceBetween={30} 
        slidesPerView={1} 
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
      >
        {products.filter((item)=>item?.bestSeller==true).map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard key={index} product={product} link={`customizations`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
