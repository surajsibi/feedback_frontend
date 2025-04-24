import React from "react";
import { useForm } from "react-hook-form";
import Input from "../utils/Input.jsx";
import Button from "../utils/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginUser } from "../../store/authSlice.js";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    
     dispatch(loginUser(data));
    if(userData.isAdmin === false){
      navigate("/dashboard");
    }else{
      navigate("/admin");
    }
  };
  
  return (
    <div className="border rounded-lg w-[30%] flex flex-col p-4  ">
      <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
        <div className="w-full flex justify-center"><h1 className="text-3xl text-[#41118d] font-semibold mb-4">Login</h1></div>
        <Input
          type="text"
          className="bg-gray-100 rounded-md w-full mb-3 p-2.5 text-sm outline-none"
          placeholder="Enter your username"
          {...register("username", {
            required: "Username is required",
          })}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <Input
          type="password"
          placeholder="Password"
          className="bg-gray-100 rounded-md w-full mb-3 p-2.5 text-sm outline-none"
          {...register("password", {
            required: "password is required",
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <Button
          type='submit'
          className="bg-indigo-700 text-white uppercase px-6 py-2 rounded-md mt-4 text-sm font-semibold"
          children="Login"

        />
      </form>
      <div>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-indigo-700">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
