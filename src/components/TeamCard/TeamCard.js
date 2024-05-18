import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const TeamCard = ({ isPreview }) => {
  return (
   <div className="rounded-md relative overflow-hidden w-[290px] h-[350px] bg-[#1c2232]">
     <Link to="/team-members" >
      <div className="team-card-upper bg-[#ffcb03]"></div>
      <div className="absolute left-[88px] bottom-[210px]">
        <img src="https://documents.iplt20.com/ipl/CSK/logos/Logooutline/CSKoutline.png" />
      </div>
      <div className="team-name">Chennai Super Kings</div>
      {!isPreview && (
        <>
          {/* Admin only button */}
          {/* <div className='absolute bottom-[30px] left-[30px] w-[calc(100%-20%)]'>
        <button className='btn btn--black'>Update Details</button>
      </div> */}
          {/* User only button */}
          <div className="absolute flex gap-3 bottom-[30px] left-[30px] w-[calc(100%-20%)]">
            <button className="btn btn--border btn--full">Subscribe</button>
            <button className="btn btn--border">
              <IoMdNotifications />
            </button>
          </div>
        </>
      )}
    </Link>
   </div>
  );
};

export default TeamCard;
