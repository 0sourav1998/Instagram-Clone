import { setToken, setUser } from "@/redux/slice/userSlice";
import { LoginOperation } from "@/service/operations/Auth";
import React, { useState } from "react";
import { FaSquareInstagram } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await LoginOperation(input, navigate);
      if (response?.data?.success) {
        dispatch(setToken(response?.data?.token));
        dispatch(setUser(response?.data?.user));
        navigate("/");
        toast.success("Logged In Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 bg-white shadow-lg p-6">
        <div className="w-full flex justify-center">
          <FaSquareInstagram className="text-4xl " />
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-y-4 mt-4">
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
          <div className="relative">
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
            <div className="absolute top-10 right-4">
              {!visible && <IoEyeOff className="text-2xl cursor-pointer" onClick={()=>setVisible(true)}/>} 
            </div>
            <div className="absolute top-10 right-4">
              {visible && <IoEye className="text-2xl cursor-pointer" onClick={()=>setVisible(false)}/>} 
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-200 p-2"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="text-xs mt-2 text-center">
          Don't have account?
          <Link to="/signup">
            <span className="text-blue-500 text-sm ml-1">Signup here</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
