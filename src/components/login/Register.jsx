import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../utils/Input.jsx'
import Button from '../utils/Button.jsx'
import { useDispatch,useSelector } from 'react-redux'
import { registerUser } from '../../store/authSlice.js'
import { NavLink } from 'react-router-dom'


const Register = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  
    const {handleSubmit,register,formState:{errors}}=useForm();
    const submit = (data) => {
      console.log(data);
      
        dispatch(registerUser(data));
    }
    console.log(userData);
    return (
        <div className="border rounded-lg w-[30%] flex flex-col p-4  ">
          <form className="flex flex-col" onSubmit={handleSubmit(submit)}>
            <div className="w-full flex justify-center"><h1 className="text-3xl text-[#41118d] font-semibold mb-4">Register</h1></div>
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
                type="email"
                placeholder="email"
                className="bg-gray-100 rounded-md w-full mb-3 p-2.5 text-sm outline-none"
                {...register("email", {
                  required: "email is required",
                })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
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
              children="Signup"
    
            />
          </form>
          <div>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <NavLink to="/login" className="text-indigo-700">
                Login
              </NavLink>
            </p>
          </div>
        </div>
      );
}

export default Register
