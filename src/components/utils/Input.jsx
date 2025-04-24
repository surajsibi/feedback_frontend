import React, { useId } from "react";

const Input = React.forwardRef(({
  label,
  type = "text",
  placeholder,
  className = "",
  bgColor = "bg-[#3e3e3e]",
  textColor = "text-black",
  ...props
},ref) => {
  const id = useId();
  return (
    <div>
      {label && (
        <labe className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </labe>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`px-3 py-[0.4rem] ${bgColor} text-md rounded-lg ${textColor} outline-none border-none w-[100%] my-[0.5%] ${className}`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
});

export default Input;
