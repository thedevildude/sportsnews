import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { signup } from "../../utils/api";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [errorArray, setErrorArray] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password } = data;
    try {
      const response = await signup(name, email, password);
      if (response.errors) {
        throw new Error(response.errors);
      }
      localStorage.setItem("authToken", response.auth_token);
      navigate("/");
    } catch (error: any) {
      setErrorArray(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Name:</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && <span>This field is required</span>}
      </div>
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

export default SignupForm;