/* eslint-disable react/prop-types */
import CustomButton from "../Button/Button";
import './Hero.css';
import check from '../../../assets/svg/check-mark.svg';

const Hero = ({ data, className = "" }) => {
  return (
    <div className={`flex items-center justify-center text-white p-8 ${className} custom-hero`}>
      {/* Left Section: Text Content */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-4">{data.headLine}</h2>
        <p className="text-lg mb-6">{data.description}</p>
        {
          data.prop1?( <div className="category-prop flex items-start"><img src={check} alt="check Icon"/><p className="text-lg mb-6">{data.prop1}</p></div>):null
        }
        {
          data.prop2?(  <div className="category-prop flex items-start"><img src={check} alt="check Icon"/><p className="text-lg mb-6">{data.prop2}</p></div>):null
        }
        {
          data.prop3?(  <div className="category-prop flex items-start"><img src={check} alt="check Icon"/><p className="text-lg mb-6">{data.prop3}</p></div>):null
        }
      
        {/* <CustomButton className={"hero-btn"} text={data.buttonText || "Erste Schritte"} onClick={data.onButtonClick} /> */}
      </div>

      {/* Right Section: Image */}
      <div className="flex-1 relative">
        <img
          src={data.image}
          alt={data.imageAlt || "Image"}
          className="rounded-lg w-full"
        />
        {/* Optional overlay patterns */}
        <div className="absolute top-5 right-5 w-20 h-20 bg-black/30"></div>
      </div>
    </div>
  );
};

export default Hero;
