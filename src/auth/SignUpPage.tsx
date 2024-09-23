import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTaskioAccountAPI } from "../api/authAPI";
import Loader from "../static/Loader";

const SignUpPage = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggle1, setToggle1] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name"),
    lastName: yup.string().required("Please enter your last name"),
    email: yup
      .string()
      .lowercase()
      .email()
      .trim()
      .required("Please enter your email address")
      .test((value) => {
        if (!value) return true;
        const emailRegex =
          /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:[a-zA-Z]{2,})$/;
        return emailRegex.test(value);
      }),
    password: yup.string().min(5).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password does not match")
      .required("Retype your password to confirm"),
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    const { firstName, lastName, email, password } = data;

    createTaskioAccountAPI({ firstName, lastName, email, password })
      .then((res: any) => {
        if (res === "Registered Successfully") {
          navigate(`/info-page/${crypto.randomUUID()}`);
        }
      })
      .then(() => {
        setLoading(false);
      });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <>
      <main className="w-full bg-[#f0f1f7] min-h-[100vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[450px] s500:w-full s500:p-5 flex items-center flex-col rounded-md p-14 min-h-[400px] bg-white"
        >
          <p className="text-[20px] font-semibold text-[rgb(51, 51, 53)]">
            Sign Up
          </p>
          <p className="text-[#BDBFC3] text-[13px]">
            Welcome & Join us by creating a free account !
          </p>
          <div className="w-full my-5 text-[13px]">
            <p className="font-medium mb-1">First Name</p>
            <input
              type="text"
              placeholder="first name"
              {...register("firstName")}
              className="w-full h-[40px] pl-5 border-slate-300 border rounded outline-none"
            />
            <p className="text-rose-500">{errors.firstName?.message}</p>
          </div>
          <div className="w-full mb-5 text-[13px]">
            <p className="font-medium mb-1">Last Name</p>
            <input
              type="text"
              placeholder="last name"
              {...register("lastName")}
              className="w-full h-[40px] pl-5 border-slate-300 border rounded outline-none"
            />
            <p className="text-rose-500">{errors.lastName?.message}</p>
          </div>
          <div className="w-full mb-5 text-[13px]">
            <p className="font-medium mb-1">Email</p>
            <input
              type="text"
              placeholder="email address"
              {...register("email")}
              className="w-full h-[40px] pl-5 border-slate-300 border rounded outline-none"
            />
            <p className="text-rose-500">{errors.email?.message}</p>
          </div>
          <div className="w-full mb-5 text-[13px]">
            <p className="font-medium mb-1">Password</p>
            <div className="flex items-center">
              <input
                type={!toggle ? "password" : "text"}
                placeholder="password"
                {...register("password")}
                className="w-full h-[40px] pl-5 border-slate-300 border-l border-t border-b rounded-l outline-none"
                onKeyPress={handleKeyPress}
              />
              {toggle ? (
                <AiOutlineEye
                  className="w-[50px] h-[40px] p-3 cursor-pointer bg-[#eceff1] rounded-r hover:bg-[#E4ECF2] duration-300"
                  onClick={() => setToggle(!toggle)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="w-[50px] h-[40px] p-3 cursor-pointer bg-[#eceff1] rounded-r hover:bg-[#E4ECF2] duration-300"
                  onClick={() => setToggle(!toggle)}
                />
              )}
            </div>
            <p className="text-rose-500">{errors.password?.message}</p>
          </div>
          <div className="w-full mb-5 text-[13px]">
            <p className="font-medium mb-1">Confirm Password</p>
            <div className="flex items-center">
              <input
                type={!toggle1 ? "password" : "text"}
                placeholder="confirm password"
                {...register("confirmPassword")}
                className="w-full h-[40px] pl-5 border-slate-300 border-l border-t border-b rounded-l outline-none"
                onKeyDown={handleKeyPress}
              />
              {toggle1 ? (
                <AiOutlineEye
                  className="w-[50px] h-[40px] p-3 cursor-pointer bg-[#eceff1] rounded-r hover:bg-[#E4ECF2] duration-300"
                  onClick={() => setToggle1(!toggle1)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="w-[50px] h-[40px] p-3 cursor-pointer bg-[#eceff1] rounded-r hover:bg-[#E4ECF2] duration-300"
                  onClick={() => setToggle1(!toggle1)}
                />
              )}
            </div>
            <p className="text-rose-500">{errors.confirmPassword?.message}</p>
          </div>
          {loading ? (
            <button
              type="submit"
              className="w-full mb-5 flex justify-center items-center font-semibold rounded-md cursor-pointer py-3 bg-[#906AE2] hover:bg-[#9c7de0] duration-300 text-white"
            >
              <Loader />
            </button>
          ) : (
            <input
              type="submit"
              value="Create Account"
              onKeyDown={handleKeyPress}
              className="w-full mb-5 text-center font-semibold rounded-md cursor-pointer py-3 bg-[#906AE2] hover:bg-[#9c7de0] duration-300 text-white"
            />
          )}

          <p className="text-[#BDBFC3] text-[13px]">
            Already have an account?{" "}
            <Link
              to="/sign-in-page"
              className="text-[#906AE2] cursor-pointer hover:underline duration-300"
            >
              Sign In
            </Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default SignUpPage;
