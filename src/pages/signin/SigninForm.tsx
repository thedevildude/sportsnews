import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from "../../context/authentication/actions";
import { useAuthenticationDispatch, useAuthenticationState } from "../../context/authentication/context";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const authenticationState = useAuthenticationState();
  const authenticationDispatch = useAuthenticationDispatch();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [errorArray, setErrorArray] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    try {
      await login(authenticationDispatch, email, password);
      if (authenticationState.isError) {
        throw authenticationState.errorMessage;
      }
      if (authenticationState.isAuthenticated|| localStorage.getItem("authToken") !== undefined) {
        navigate("/");
      }
    } catch (error: any) {
      setErrorArray(authenticationState.errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && <span>This field is required</span>}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && <span>This field is required</span>}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign In
      </button>
      {errorArray && <p className="text-red-500 mt-2">{errorArray}</p>}
    </form>
  );
};

export default SigninForm;