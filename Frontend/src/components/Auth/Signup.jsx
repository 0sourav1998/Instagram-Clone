import React, { useState } from "react";
import { FaSquareInstagram } from "react-icons/fa6";
import { SignupOperation } from "../../service/operations/Auth";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [visible,setVisible] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await SignupOperation(input, navigate);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 bg-white shadow-lg p-6">
        <span className="w-full flex justify-center items-center">
          <FaSquareInstagram className="text-4xl" />
        </span>
        <form onSubmit={handlSignup} className="flex flex-col gap-y-4 mt-4">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="username" className="font-semibold">
              User Name
            </label>
            <input
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
              placeholder="Enter User Name"
              id="username"
              className="p-2 w-full outline-none rounded-md focus-within:ring-2 focus-within:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              placeholder="Enter User Name"
              id="email"
              className="p-2 w-full outline-none rounded-md focus-within:ring-2 focus-within:ring-blue-400"
            />
          </div>
          <div className="relative">
            <div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <input
                  placeholder="Enter User Name"
                  id="password"
                  type={visible ? "text" : "password"}
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, password: e.target.value })
                  }
                  className="p-2 w-full outline-none rounded-md focus-within:ring-2 focus-within:ring-blue-400"
                />
              </div>
            </div>
            <div>
              <div className="absolute top-10 right-4">
                {!visible && (
                  <IoEyeOff
                    className="text-2xl cursor-pointer"
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              <div className="absolute top-10 right-4">
                {visible && (
                  <IoEye
                    className="text-2xl cursor-pointer"
                    onClick={() => setVisible(false)}
                  />
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-200 p-2"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
        <div className="text-xs mt-2 text-center">
          Already have account?
          <Link to="/login">
            <span className="text-blue-500 text-sm ml-1">Login here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
