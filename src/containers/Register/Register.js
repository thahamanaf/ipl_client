import React from 'react'
import { Link } from "react-router-dom"

const Register = () => {
  return (
    <div className="login-page-container">
      <div className="flex flex-col gap-3 border rounded-md p-5">
        <h1 className="text-xl font-semibold text-center">Sign in to your account</h1>
        <center><img className="w-20" src="https://www.iplt20.com/assets/images/IPL_LOGO_CORPORATE_2024.png"/></center>
        <div>
          <label>Full Name</label>
          <input placeholder="John Mary" type="email" />
        </div>
        <div>
          <label>Email</label>
          <input placeholder="name@example.com" type="email" />
        </div>
        <div>
          <label>Password</label>
          <input placeholder="••••••••" type="email" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input placeholder="••••••••" type="email" />
        </div>

        <button className="btn">Sign up</button>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-800 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register