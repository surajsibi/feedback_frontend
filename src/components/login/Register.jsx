import React, { useEffect,useState} from 'react'
import { useForm } from 'react-hook-form'
import Input from '../utils/Input.jsx'
import Button from '../utils/Button.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/authSlice.js'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData, "this is user data");
  const [confirmPassword, setConfirmPassword] = useState(false);





  const { handleSubmit, register, formState: { errors } } = useForm();
  const submit = (data) => {
    console.log(data);
    if (data.password !== data.confirm) {
      toast.error("Password doesn't match");
    }
    else {
      const registerData = {
        username: data.username,
        email: data.email,
        password: data.password
      }

      dispatch(registerUser(registerData));

    }

  }
  useEffect(() => {
    if (userData) {
      navigate("/dashboard")
    }

  }, [userData])
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
        <Input
          type="password"
          placeholder="Confirm Password"
          className="bg-gray-100 rounded-md w-full mb-3 p-2.5 text-sm outline-none"
          {...register("confirm", {
            required: "Confirm password is required",
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
          <NavLink to="/" className="text-indigo-700">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register
