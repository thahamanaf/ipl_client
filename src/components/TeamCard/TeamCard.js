import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CreateTeam from "../CreateTeam/CreateTeam";
import { useSelector, useDispatch } from "react-redux";
import { userRoles } from "../../utils/userRoles";
import {
  setTeamSubscription,
  removeTeamSubscription,
} from "../../redux/reducers/auth";
import ManageNotification from "../Notification/ManageNotification";
import TeamMemberList from "../TeamMemberList/TeamMemberList";
import { toast } from "react-toastify";

const TeamCard = ({ isPreview, data, fetchTeamList }) => {
  const user = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const isAdmin = user.role === userRoles.admin;
  const axios = useAxiosPrivate();
  const team_name = data?.team_name || "";
  const team_logo = data?.team_logo || "";
  const team_score = data?.team_score || "0";
  const upper_card_color = data?.upper_card_color || "";
  const lower_card_color = data?.lower_card_color || "";
  const teamId = data?._id || null;
  const notification_preferences = user?.notification_preferences?.find(
    (i) => i.teamId === teamId
  ) || {
    teamId: teamId,
    teamMemberUpdate: true,
    scoreUpdate: true,
  };

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const isSubscribed = !!user?.subscribed_team?.find((i) => i === teamId);

  const handleDeleteTeam = async () => {
    if (!teamId) {
      return;
    }
    const res = await axios
      .delete(`team/removeTeam/${teamId}`)
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      fetchTeamList();
    } else {
      toast.error(res?.response?.data?.message || "Failed to delete team");
    }
  };

  const handleCreateTeamSubscription = async () => {
    const res = await axios
      .get(`team/subscribeTeam/${teamId}`)
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      if (res?.data?.data?._id) {
        fetchTeamList();

        dispatch(setTeamSubscription(teamId));
      }
    } else {
      toast.error(res?.response?.data?.message || "Failed to subscribe team");
    }
  };
  const handleRemoveTeamSubscription = async () => {
    const res = await axios
      .get(`team/removeTeamSubscription/${teamId}`)
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      fetchTeamList();

      dispatch(removeTeamSubscription(teamId));
    } else {
      toast.error(
        res?.response?.data?.message || "Failed to remove team subscription"
      );
    }
  };
  const handleSubsribe = () => {
    if (isSubscribed) {
      handleRemoveTeamSubscription();
    } else {
      handleCreateTeamSubscription();
    }
  };
  const [isManageNotification, setManageNotification] = useState(false);
  const [isOpenMemberList, setMemberList] = useState(false);
  return (
    <div
      className="rounded-md relative overflow-hidden w-[290px] h-[350px]"
      style={{
        backgroundColor: lower_card_color,
      }}
    >
      <TeamMemberList
        close={() => setMemberList(false)}
        open={isOpenMemberList}
        teamMembers={data?.team_members || []}
      />
      {isManageNotification && (
        <ManageNotification
          open={isManageNotification}
          close={() => setManageNotification(false)}
          notification_preferences={notification_preferences}
          fetchTeamList={fetchTeamList}
        />
      )}
      {isEdit && (
        <div className="z-20">
          <CreateTeam
            open={isEdit}
            isEdit={isEdit}
            close={() => setIsEdit(false)}
            teamData={data}
            fetchTeamList={fetchTeamList}
          />
        </div>
      )}
      {confirmDelete ? (
        <div>
          <button
            onClick={handleDeleteTeam}
            className="btn btn--red absolute right-1 top-2 z-10"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(false)}
            className="btn btn--border absolute right-[100px] top-2 z-10"
          >
            Cancel
          </button>
        </div>
      ) : !isPreview && isAdmin ? (
        <button
          onClick={() => setConfirmDelete(true)}
          className="btn btn--border absolute right-1 top-2 z-10"
        >
          <MdDelete />
        </button>
      ) : null}
      <div
        style={{
          backgroundColor: upper_card_color,
        }}
        className="team-card-upper"
      ></div>
      <div
        onClick={() => setMemberList(true)}
        className="absolute left-[88px] bottom-[210px]"
      >
        <img className="w-[120px]" src={team_logo} alt="team logo" />
      </div>

      <div className="team-name text">{team_name}</div>
      <div className="team-name team-score text">Score: {team_score}</div>
      {!isPreview && (
        <>
          {isAdmin ? (
            <div className="absolute bottom-[30px] left-[30px] w-[calc(100%-20%)]">
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="btn btn--black btn--full"
              >
                Update Details
              </button>
            </div>
          ) : (
            <div className="absolute flex gap-3 bottom-[30px] left-[30px] w-[calc(100%-20%)]">
              <button
                type="button"
                onClick={handleSubsribe}
                className="btn btn--border btn--full"
              >
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </button>
              <button
                onClick={() => setManageNotification(true)}
                className="btn btn--border"
              >
                <IoMdNotifications />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeamCard;
