import React, { useState } from "react";
import TeamList from "../TeamList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoNotificationsCircle } from "react-icons/io5";
import Notification from "../../components/Notification/Notification";
import { logout } from "../../utils/logout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.profile);
  const notification = useSelector((state) => state.auth.notification);
  const isUnReadNotification = notification.find((i) => !i.read)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleLogout = () => {
    logout()
    navigate("/")
  }
  return (
    <div className="dashboard-container relative">
      {isNotificationOpen && (
        <Notification
          open={isNotificationOpen}
          close={() => setIsNotificationOpen(false)}
        />
      )}
      <div className="dashboard-cover">
        <button className="text-white absolute left-5 top-[10px] font-medium cursor-pointer">
          Welcome back {user?.fullname || "Loading..."}
        </button>
        <button
          onClick={() => setIsNotificationOpen(true)}
          className={`btn ${!isUnReadNotification && "btn--border"} absolute right-24 top-[10px] font-medium cursor-pointer`}
        >
          <IoNotificationsCircle />
        </button>
        <button
          onClick={handleLogout}
          className="text-white absolute right-5 top-[10px] font-medium cursor-pointer"
        >
          Logout
        </button>
        <div className="flex justify-center items-center h-full">
          <img
            className="w-32"
            src="https://www.iplt20.com/assets/images/IPL_LOGO_CORPORATE_2024.png"
          />
        </div>
      </div>
      <div className="py-10 md:px-40">
        <TeamList />
      </div>
    </div>
  );
};

export default Dashboard;
