/* eslint-disable react/prop-types */

const Button = ({ text, type, className }) => {
  return (
    <button
      type={type}
      
      className={`btnLog ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
