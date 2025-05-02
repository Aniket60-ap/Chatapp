import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/UserSlices";
function Login() {
  const navigate = useNavigate();
  const [user, SetUser] = useState({
    userName: "",
    password: "",
  });
  const dispatch = useDispatch();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    if (!user.userName.trim() || !user.password.trim()) {
      toast.error("Please enter both username and password");
      return;
    }
  
    try {
      const res = await axios.post(
        "https://chatapp-backend-4xha.onrender.com/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      // Proceed only if login is successful
      if (res.data.success) {
        dispatch(setAuthUser(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  
    SetUser({
      userName: "",
      password: "",
    });
  };
  
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 bg-gray-400 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center ">Login</h1>
        <form onSubmit={onSubmitHandler} className="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">UserName</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => SetUser({ ...user, userName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="UserName"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => SetUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="password"
            />
          </div>
          <Link to="/register">Don't have an account ?</Link>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
