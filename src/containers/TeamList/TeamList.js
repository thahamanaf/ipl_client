import React, { useEffect, useState } from "react";
import TeamCard from "../../components/TeamCard/TeamCard";
import CreateTeam from "../../components/CreateTeam/CreateTeam";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { userRoles } from "../../utils/userRoles";
import { toast } from "react-toastify";

const TeamList = () => {
  const user = useSelector((state) => state.auth.profile);
  const isAdmin = user.role === userRoles.admin;
  const axios = useAxiosPrivate();
  const [isCreateTeamOpen, setCreateTeamOpen] = useState(false);
  const handleOpenCreateTeam = (status) => {
    setCreateTeamOpen(status);
  };

  const [teamList, setTeamList] = useState([]);
  const fetchTeamList = async () => {
    const res = await axios
      .get("team/getAllTeamList")
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      setTeamList(res.data.data);
    } else {
      toast.error(res?.response?.data?.message || "No data found");
    }
  };
  useEffect(() => {
    fetchTeamList();
  }, []);
  return (
    <div>
      {/* Admin only */}
      <CreateTeam
        fetchTeamList={fetchTeamList}
        open={isCreateTeamOpen}
        close={() => handleOpenCreateTeam(false)}
      />
      {isAdmin && (
        <div className="flex justify-end p-3">
          <button
            onClick={() => handleOpenCreateTeam(true)}
            className="btn btn--border"
          >
            Add Team
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-5 justify-center">
        {teamList.map((team, index) => (
          <TeamCard
            key={`${index}_team_card`}
            fetchTeamList={fetchTeamList}
            data={team}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamList;
