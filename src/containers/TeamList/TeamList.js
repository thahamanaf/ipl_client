import React, { useState } from "react";
import TeamCard from "../../components/TeamCard/TeamCard";
import CreateTeam from "../../components/CreateTeam/CreateTeam";

const TeamList = () => {
  const [isCreateTeamOpen, setCreateTeamOpen] = useState(false);
  const handleOpenCreateTeam = (status) => {
    setCreateTeamOpen(status);
  };
  return (
    <div>
      {/* Admin only */}
      <CreateTeam
        open={isCreateTeamOpen}
        close={() => handleOpenCreateTeam(false)}
      />
      <div className="flex justify-end p-3">
        <button
          onClick={() => handleOpenCreateTeam(true)}
          className="btn btn--border"
        >
          Add Team
        </button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        <TeamCard />
      </div>
    </div>
  );
};

export default TeamList;
