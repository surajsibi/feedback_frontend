import React from 'react'

const Button = ({
    children,
    type="button",
    disableHover = false,
    className ="",
    ...props
}) => {
  return (
    <button type={type}  className={` font-bold cursor-pointer tracking-tight uppercase border rounded-md ${disableHover ? "" : " hover:scale-110 "}transition-all duration-300 ${className}`}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button