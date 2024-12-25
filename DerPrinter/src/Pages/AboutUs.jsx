import AboutUs from "../components/shared/AboutSection/AboutSection";
import BannerSection from "../components/shared/BannerSection/BanerSection";
import FeaturesList from "../components/shared/FeaturesList/FeaturesList";
import HomeHeroSection from "../components/shared/hero/HomeHeroSection";
import ReviewsList from "../components/shared/ReviewsList/ReviewsList";
import WhyUsSection from "../components/shared/WhyUsSection/WhyUsSection";
import WhatWeOfferSection from "../components/shared/WhatWeOfferSection/WhatWeOfferSection";
import { useEffect, useState } from "react";
import { fetchHomeOrBlogsData } from "../Utils/GetApi";
import ContactHeader from "../components/ContactUs/ContactHeader/ContactHeader";

 const AboutUsPage = () => {
    const [homeData, setHomeData] = useState();
    const [loading, setLoading] = useState(true);
    const [slidesData,setSlidesData] = useState([])
  
    useEffect(() => {
      async function loadHomeData() {
        const data = await fetchHomeOrBlogsData("homePage");
        setHomeData(data);
        setSlidesData ([data[0].slider1,data[0].slider2,data[0].slider3,data[0].slider4])
        setLoading(false);
      }
      loadHomeData();
    }, []);
  return (
    <div>
      {!loading && <HomeHeroSection slidesData={slidesData}/> }

      {!loading?<AboutUs  data={homeData[0].AboutSection}/>:<p>Loading</p>}
      <ContactHeader 
        title={"Unser Versprechen"}
        desc={"Ihre Ideen. Ihre Vision. Perfekt umgesetzt. Wir garantieren Ihnen hochwertige Druckerzeugnisse, die mit Liebe zum Detail und modernster Technik produziert werden. Ihre Zufriedenheit steht dabei immer an erster Stelle."}
      />
      <WhyUsSection />
      <WhatWeOfferSection />
      <FeaturesList />
      {!loading && <BannerSection data={homeData[0]?.HintSection}/>}
      <ReviewsList />
    </div>
  )
}

export default AboutUsPage