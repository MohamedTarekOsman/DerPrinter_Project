/* eslint-disable react/prop-types */

const ImgButton = ({ src, alt, text }) => {
  return (
    <button className="flex items-center justify-center w-full border border-gray-300 rounded-[10px] py-3 hover:bg-gray-100 bg-white">
      <img src={src} alt={alt} className="mr-2 md:w-8 w-7 " />
      <p className="lg:text-[22px] md:text-[20px] text-[16px] font-medium">
        {text}
      </p>
    </button>
  );
};

export default ImgButton;
