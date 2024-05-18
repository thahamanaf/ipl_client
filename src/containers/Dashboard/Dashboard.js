import React from "react";
import TeamList from "../TeamList";

const Dashboard = () => {
  return (
    <div className="dashboard-container relative">
      <div className="dashboard-cover">
        <button className="text-white absolute right-5 top-[10px] font-medium cursor-pointer">
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
