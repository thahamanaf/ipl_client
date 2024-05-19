import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../helpers/axios";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../../redux/reducers/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const fields = {
  email: "email",
  password: "password",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handleSetData = (value, source) => {
    setData((prev) => ({ ...prev, [source]: value }));
  };
  const login = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("auth/login", data)
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      const token = res.data.token;
      sessionStorage.setItem("authToken", token);
      dispatch(setUserData({ ...res.data.data, token }));
      navigate("/dashboard");
    } else {
      toast.error(res?.response?.data?.message || "Failed to login");
    }
  };
  return (
    <div className="login-page-container">
      <div className="flex flex-col gap-3 border rounded-md p-5">
        <h1 className="text-xl font-semibold text-center">
          Sign in to your account
        </h1>
        <center>
          <img
            className="w-20"
            src="https://www.iplt20.com/assets/images/IPL_LOGO_CORPORATE_2024.png"
          />
        </center>
        <form onSubmit={login} className="flex flex-col gap-3">
          <div>
            <label>Email</label>
            <input
              required
              className="text-black"
              onChange={(e) => handleSetData(e.target.value, fields.email)}
              placeholder="name@example.com"
              type="email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              required
              className="text-black"
              onChange={(e) => handleSetData(e.target.value, fields.password)}
              placeholder="••••••••"
              type="password"
            />
          </div>

          <button type="submit" className="btn">
            Sign in
          </button>
        </form>
        <p className="text-sm">
          Don't have an account yet?{" "}
          <Link to="/register" className="text-blue-800 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
