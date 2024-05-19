import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useAxiosPrivate = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.profile);
  const [authToken, setAuthToken] = useState(
    user?.token || sessionStorage.getItem("authToken")
  );
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (!authToken) {
      toast.info("Session Expired, Login again")
      navigate("/")
    }
    setIsloading(!isLoading);
  }, [user]);
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    withCredentials: true,
  });
};

export default useAxiosPrivate;
