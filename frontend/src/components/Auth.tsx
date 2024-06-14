import { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { SignupInput, SigninInput } from "@sachin_kumawat/medium-common";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [signupInputs, setSignupInput] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const [signinInputs, setSigninInput] = useState<SigninInput>({
    email: "",
    password: "",
  });

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupInput((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSigninInput((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/${type === "signup" ? "signup" : "signin"}`,
        type === "signup" ? signupInputs : signinInputs
      );

      const jwt = response.data;
      localStorage.setItem("token", jwt.jwt);
      navigate("/blog/1");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center flex-col gap-2'>
      <div className='flex justify-center flex-col gap-5'>
        <div>
          <h1 className='text-3xl font-bold text-center'>
            {type === "signup" ? "Create an account" : "Login to account"}
          </h1>
          <p className='text-center text-gray-500 font-sm text-sm mt-1'>
            {type === "signup" ? (
              <>
                Already have an account?{" "}
                <NavLink className='underline' to='/signin'>
                  Login
                </NavLink>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <NavLink className='underline' to='/signup'>
                  Sign Up
                </NavLink>
              </>
            )}
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          {type === "signup" && (
            <LabelledInput
              label='Name'
              placeholder='Enter your name'
              onChange={handleSignupChange}
              id='name'
            />
          )}
          <LabelledInput
            label='Email'
            placeholder='Enter your email'
            onChange={
              type === "signup" ? handleSignupChange : handleSigninChange
            }
            id='email'
          />
          <LabelledInput
            label='Password'
            placeholder='Enter your password'
            onChange={
              type === "signup" ? handleSignupChange : handleSigninChange
            }
            id='password'
            type='password'
          />
        </div>

        <button
          type='button'
          className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
          onClick={onSubmit}
        >
          {type === "signup" ? "Signup" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputTypes {
  label: string;
  placeholder: string;
  id: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  id,
  type,
}: LabelledInputTypes) {
  return (
    <div className='max-w-sm w-full'>
      <label
        htmlFor={id}
        className='block mb-2 text-sm font-medium text-gray-900 light:text-white'
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id={id}
        className='bg-gray-50 w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500'
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default Auth;
