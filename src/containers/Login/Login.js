import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page-container">
      <div className="flex flex-col gap-3 border rounded-md p-5">
        <h1 className="text-xl font-semibold text-center">Sign in to your account</h1>
        <center><img className="w-20" src="https://www.iplt20.com/assets/images/IPL_LOGO_CORPORATE_2024.png"/></center>
        <div>
          <label>Email</label>
          <input placeholder="name@example.com" type="email" />
        </div>
        <div>
          <label>Password</label>
          <input placeholder="••••••••" type="email" />
        </div>

        <button className="btn"><Link to="/dashboard">Sign in</Link></button>
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
