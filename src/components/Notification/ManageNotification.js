import React, { useState } from "react";
import Modal from "react-responsive-modal";
import { Switch } from "antd";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const fields = {
  scoreUpdate: "scoreUpdate",
  teamMemberUpdate: "teamMemberUpdate",
};

const ManageNotification = ({
  open,
  close,
  notification_preferences,
  fetchTeamList,
}) => {
  const axios = useAxiosPrivate();
  const [data, setData] = useState(notification_preferences);
  const handleSetData = (value, sourse) => {
    setData((prev) => ({ ...prev, [sourse]: value }));
  };

  const handleSubmit = async () => {
    const teamId = data?.teamId;
    if (!teamId) {
      return;
    }
    const { teamMemberUpdate, scoreUpdate } = data;
    const res = await axios
      .put(`team/manageNotificationPreference/${teamId}`, {
        scoreUpdate,
        teamMemberUpdate,
      })
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      fetchTeamList();
      close();
    } else {
      toast.error(
        res?.response?.data?.message ||
          "Failed to manage notification preferences"
      );
    }
  };
  return (
    <Modal center open={open} onClose={close} showCloseIcon={false}>
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-lg">
          Manage Notification Preference
        </h1>
        <div className="flex items-center justify-between">
          <label>Score Update</label>
          <Switch
            onChange={(e) => handleSetData(e, fields.scoreUpdate)}
            defaultChecked={notification_preferences.scoreUpdate}
          />
        </div>
        <div className="flex items-center justify-between">
          <label>Team Update</label>
          <Switch
            onChange={(e) => handleSetData(e, fields.teamMemberUpdate)}
            defaultChecked={notification_preferences.teamMemberUpdate}
          />
        </div>
        <button onClick={handleSubmit} className="btn">
          Update
        </button>
        <button onClick={close} className="btn btn--border">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ManageNotification;
