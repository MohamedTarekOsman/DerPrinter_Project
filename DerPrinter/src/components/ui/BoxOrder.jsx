/* eslint-disable react/prop-types */

const BoxOrder = ({ text, num, abdruck, className, ...props }) => {
  return (
    <div
      className={`bg-bg shadow-md rounded-lg md:p-6 p-5 text-center cursor-pointer ${className}`}
      {...props}
    >
      <h2 className="lg:text-lg md:text-[16px] text-[14px] font-semibold mb-2">
        {text}
      </h2>
      <p className="lg:text-3xl md:text-2xl text-xl font-bold mb-2">{num}</p>
      <p className="">{abdruck}</p>
    </div>
  );
};

export default BoxOrder;
