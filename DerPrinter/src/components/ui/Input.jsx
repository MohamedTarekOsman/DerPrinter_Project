/* eslint-disable react/prop-types */

import { cn } from "../../lib/utils";

const Input = ({ type, placeholder, error, className, icon, ...props }) => {
  const onErr = error ? "block" : "hidden";

  return (
    <div className="relative w-full">
      <div>
        {icon && (
          <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={cn(
            "inputLogin",
            error && "ring-red-500 border-red-500 ring-1",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <span className={cn(onErr, "text-red-700 text-[10px] font-semibold")}>
          *{error}
        </span>
      )}
    </div>
  );
};

export default Input;
