import React from "react";
import TeamMemberCard from "./TeamMemberCard";
import TeamCard from "../TeamCard/TeamCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

const TeamMemberList = () => {
  const arr = new Array(10).fill(0);

  return (
    <div className="dashboard-container relative">
      <div className="dashboard-cover">
        <button className="text-white absolute left-5 top-[10px] font-medium cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </button>
        <button className="text-white absolute right-5 top-[10px] font-medium cursor-pointer">
        <Link to="/">Logout</Link>
        </button>
        <div className="flex justify-center items-center h-full">
          <div className="text-white  max-w-[calc(100%-20%)] h-full">
            <div className="swiper-outer pb-6 mr-10 relative overflow-hidden  h-full">
              <Swiper
                modules={[Navigation]}
                spaceBetween={1}
                slidesPerView={4}
                navigation
                updateOnWindowResize
                className="h-full"
              >
                {arr.map((item, index) => {
                  return (
                    <SwiperSlide key={`key${index}_swiper_slide`}>
                      <div className="flex justify-center items-center h-full">
                        <h1>Team</h1>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 md:px-40">

        <div className="flex justify-center py-3">  <TeamCard/></div>

        <div className="flex flex-wrap gap-5 justify-center">
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
        <TeamMemberCard />
       
        </div>
      </div>
    </div>
  );
};

export default TeamMemberList;
