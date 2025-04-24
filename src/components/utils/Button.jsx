import React from 'react'

const Button = ({
    children,
    type="button",
    bgColor="#512da8",
    textColor="red",
    className ="",
    ...props
}) => {
  return (
    <button className={`  font-bold cursor-pointer tracking-tight uppercase border ${className} ${type} bg-[${bgColor}] text-${textColor} rounded-md py-2 px-4`}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button