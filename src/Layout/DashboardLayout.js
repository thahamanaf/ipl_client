import React, { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/reducers/auth";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { setNotification } from "../redux/reducers/auth";

const DashboardLayout = () => {
  const socket = io("http://localhost:5000");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.profile);
  const initialRendering = useRef(true);
  const axios = useAxiosPrivate();

  const fetchUserDetails = async () => {
    const res = await axios
      .get("auth/getUserByAuth")
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      const token = sessionStorage.getItem("authToken");
      dispatch(setUserData({ ...res.data.data, token }));
    }
  };
  const fetchNotificationList = async () => {
    const res = await axios
      .get("team/getAllNotification")
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      dispatch(setNotification(res?.data?.data || []));

      if (Number(res?.data?.deletedCount)) {
        toast(`You have ${res?.data?.deletedCount} pending notifications`);
      }
    }
  };

  useEffect(() => {
    if (initialRendering.current) {
      setTimeout(() => {
        fetchNotificationList();
      }, 1000);
      initialRendering.current = false;
    }
    if (!user?.token) {
      fetchUserDetails();
    }
  }, [user?.token]);

  useEffect(() => {
    // Socket.IO event listeners
    socket.on("connect", () => {
      console.log("Connected to server");
      if (user?._id) {
        socket.emit("setUserId", user?._id);
      }
    });
    socket.on("disconnect", (reason) => {
      if (socket.active) {
        // temporary disconnection, the socket will automatically try to reconnect
      } else {
        // the connection was forcefully closed by the server or the client itself
        // in that case, `socket.connect()` must be manually called in order to reconnect
        console.log(reason);
      }
    });

    socket.on("notification", (message) => {
      toast(message);
      // Handle team update notification
      dispatch(setNotification(message));
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <Outlet />;
};

export default DashboardLayout;
