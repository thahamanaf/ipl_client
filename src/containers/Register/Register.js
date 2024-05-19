import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../helpers/axios";
import { useNavigate } from "react-router-dom";

const field = {
  email: "email",
  password: "password",
  fullname: "fullname",
};

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handleSetData = (value, source) => {
    setData((prev) => ({ ...prev, [source]: value }));
  };

  const registerUser = async () => {
    const { fullname, email, password } = data;
    const res = await axios
      .post("auth/register", {
        fullname,
        email,
        password,
      })
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      toast.success(res.data.message);
      navigate("/")
    } else {
      toast.error(res?.response?.data?.message || "User creation failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = Object.keys(data);
    const fieldCount = 4;
    if (items.length !== fieldCount) {
      return toast.error("All fields required");
    }
    const { password, confirm_password } = data;
    if (password !== confirm_password) {
      return toast.error("Password should match");
    }
    if (password.length < 8) {
      return toast.error("Password should have minimum of 8 characterd");
    }
    registerUser();
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label>Full Name</label>
            <input
              className="text-black"
              onChange={(e) => handleSetData(e.target.value, field.fullname)}
              placeholder="John Mary"
              type="text"
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              className="text-black"
              onChange={(e) => handleSetData(e.target.value, field.email)}
              required
              placeholder="name@example.com"
              type="email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className="text-black"
              onChange={(e) => handleSetData(e.target.value, field.password)}
              required
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              className="text-black"
              onChange={(e) =>
                handleSetData(e.target.value, "confirm_password")
              }
              required
              placeholder="••••••••"
              type="password"
            />
          </div>

          <button type="submit" className="btn">
            Sign up
          </button>
        </form>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-800 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
