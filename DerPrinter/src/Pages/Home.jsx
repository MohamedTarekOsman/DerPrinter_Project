import AboutUs from "../components/shared/AboutSection/AboutSection";
import BannerSection from "../components/shared/BannerSection/BanerSection";
import FeaturesList from "../components/shared/FeaturesList/FeaturesList";
import HomeHeroSection from "../components/shared/hero/HomeHeroSection";
import ProductList from "../components/shared/ProductsList/ProductsList";
import ProductSlider from "../components/shared/ProductsSlider/ProductsSlider";
import ReviewsList from "../components/shared/ReviewsList/ReviewsList";
import { useEffect, useState } from "react";
import { fetchHomeOrBlogsData } from "../Utils/GetApi";

 const Home = () => {
    const [homeData, setHomeData] = useState();
    const [loading, setLoading] = useState(true);
    const [slidesData,setSlidesData] = useState([])
  
    useEffect(() => {
      async function loadHomeData() {
        const data = await fetchHomeOrBlogsData("homePage");
        setHomeData(data);
        setSlidesData ([data[0].slider1,data[0].slider2,data[0].slider3,data[0].slider4])
        setLoading(false);
        console.log("Our Home DATA",data)
      }
  
      loadHomeData();
    }, []);
  return (
    <div>
      {!loading && <HomeHeroSection slidesData={slidesData}/> }
      <ProductList 
        title={"Ausgewählte Produkte"}
        subTitle={"Von Ideen zum Druck – einzigartig, wie du es willst"}
      />
      {!loading?<AboutUs  data={homeData[0].AboutSection}/>:<p>Loading</p>}
      <ProductSlider />
      <FeaturesList />
      {!loading && <BannerSection data={homeData[0]?.HintSection}/>}
      <ReviewsList />
    </div>
  )
}

export default Home