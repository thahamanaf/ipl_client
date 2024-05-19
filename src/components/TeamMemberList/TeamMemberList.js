import React from "react";
import TeamMemberCard from "./TeamMemberCard";
import Modal from "react-responsive-modal";
import { IoMdClose } from "react-icons/io";


const TeamMemberList = ({ open, close, teamMembers }) => {
  const members = teamMembers || []
  return (
    <Modal open={open} onClose={close} center showCloseIcon={false}>
      <div className="flex flex-col min-w-[400px]">
        <div className="flex justify-between items-center gap-10 py-5">
          <h1 className="tet-lg font-semibold">Team Members</h1>
          <button className="btn btn--border" onClick={close}><IoMdClose/></button>
        </div>
        <div className="flex justify-center flex-wrap gap-5">
          {
            members.length ? members.map((item, index) => {
              return (<TeamMemberCard key={`${index}_item_team_mem`} name={item}/>)
            }) : "No team members found"
          }
        </div>
      </div>
    </Modal>
  );
};

export default TeamMemberList;
