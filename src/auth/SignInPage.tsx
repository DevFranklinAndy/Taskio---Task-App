import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  signIntoTaskioAccountAPI,
  verifyTaskioAccountAPI,
} from "../api/authAPI";
import { taskioUserDetails } from "../global/ReduxStates";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Loader from "../static/Loader";

const SignInPage = () => {
  const { token } = useParams();
  const [toggle, setToggle] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .lowercase()
      .trim()
      .required("Please enter your email address"),
    password: yup.string().required("Please type in your password"),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    const { email, password } = data;

    signIntoTaskioAccountAPI({ email, password }).then((res: any) => {
      if (res?.message === "Welcome Back Taskion") {
        const decode: any = jwtDecode(res.data);
        dispatch(taskioUserDetails(decode.id));
        navigate("/");
      }
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    if (token) {
      verifyTaskioAccountAPI(token);
    }
  }, []);

  return (
    <>
      <main className="w-full bg-[#f0f1f7] h-[100vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[450px] s500:w-full s500:p-5 flex items-center flex-col rounded-md p-14 min-h-[200px] bg-white"
        >
          <p className="text-[20px] font-semibold text-[rgb(51, 51, 53)]">
            Sign In
          </p>
          <p className="text-[#BDBFC3] text-[13px]">Welcome Taskion!</p>
          <div className="w-full mb-5 text-[13px]">
            <p className="font-medium mb-1">Email</p>
            <input
              type="text"
              {...register("email")}
              placeholder="email address"
              className="w-full h-[40px] pl-5 border-slate-300 border rounded outline-none"
              onKeyDown={handleKeyPress}
            />
            <p className="text-rose-500">{errors.email?.message}</p>
          </div>
          <div className="w-full mb-5 text-[13px]">
            <p className="font-medium mb-1">Password</p>
            <div
              className="flex items-center
            "
            >
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
              value="Sign In"
              onKeyDown={handleKeyPress}
              className="w-full mb-5 text-center font-semibold rounded-md cursor-pointer py-3 bg-[#906AE2] hover:bg-[#9c7de0] duration-300 text-white"
            />
          )}
          <p className="text-[#BDBFC3] text-[13px]">
            Don't have an account?{" "}
            <Link
              to="/sign-up-page"
              className="text-[#906AE2] cursor-pointer hover:underline duration-300"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default SignInPage;
