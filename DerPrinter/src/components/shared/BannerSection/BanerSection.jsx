import React from "react";
import image from '../../../assets/images/BannerImage.png';

const BannerSection = ({data}) => {
  return (
    <div className="bg-gray-100 p-6 flex flex-col lg:flex-row items-center gap-6 py-20">
      <div className="container flex flex-col lg:flex-row items-center gap-6">
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-2xl lg:text-4xl font-bold text-black mb-4">
          {data.title} – <br />
          <span className="font-normal">{data.name}</span>
        </h1>
        <p className="text-gray-600 text-sm lg:text-base">
          {data.description}
        </p>
      </div>

      {/* الصورة */}
      <div className="flex-1">
        <img
          src={data.image}
          alt="Printing example"
          className="w-full h-auto"
        />
      </div>
      </div>
    </div>
  );
};

export default BannerSection;
