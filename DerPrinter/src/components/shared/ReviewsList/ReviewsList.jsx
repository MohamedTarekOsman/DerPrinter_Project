import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewCard from "../ReviewCard/ReviewCard"; 
import { fetchData } from "../../../Utils/GetApi";

const ReviewsList = () => {
  
  
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchData("user");
      setUsers(data);
    }

    loadUsers();
  }, []);

  const reviews = users.flatMap(user => {
    if (user.ratingStars) {
      return [{
        name: user.name,
        stars: user.ratingStars,
        gender: user.gender,
        text: user.ratingText
      }];
    } else {
      return []
    }
  });
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-2xl font-semibold mb-6">
        Kundenmeinungen
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        // slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 }, 
        }}
        className="w-full review-list"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsList;
