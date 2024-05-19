import React, { useEffect, useState, useRef } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import TeamCard from "../TeamCard/TeamCard";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag, theme, Tooltip } from "antd";
import { HexColorPicker } from "react-colorful";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const tagInputStyle = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

const fields = {
  team_logo: "team_logo",
  team_members: "team_members",
  team_name: "team_name",
  upper_card_color: "upper_card_color",
  lower_card_color: "lower_card_color",
  team_score: "team_score",
};

const CreateTeam = ({ open, close, fetchTeamList, isEdit, teamData }) => {
  const [upperColor, setUpperColor] = useState(
    teamData?.upper_card_color || "#FFCB03"
  );
  const [bgColor, setBgColor] = useState(
    teamData?.lower_card_color || "#1C2232"
  );
  const [data, setData] = useState(teamData || {});
  const { token } = theme.useToken();
  const [tags, setTags] = useState(teamData?.team_members || []);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const handleSetData = (value, source) => {
    setData((prev) => ({ ...prev, [source]: value }));
  };
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };
  const tagPlusStyle = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };
  const [openUpperColorPicker, setOpenUpperColorPicker] = useState(false);
  const [openBgColorPicker, setOpenBgColorPicker] = useState(false);
  const axios = useAxiosPrivate();

  const handleCloseModal = () => {
    setTags([]);
    setData({});
    close();
  };

  const creaetTeam = async () => {
    const res = await axios
      .post("team/createTeam", {
        ...data,
        team_members: tags,
        upper_card_color: upperColor,
        lower_card_color: bgColor,
      })
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      fetchTeamList();
      handleCloseModal();
    } else {
      toast.error(res?.response?.data?.message || "Failed to create team");
    }
  };
  const updateTeam = async () => {
    const teamid = teamData?._id;
    if (!teamid) {
      return;
    }
    const reqObj = {
      ...data,
      team_members: tags,
      upper_card_color: upperColor,
      lower_card_color: bgColor,
    };
    delete reqObj._id;
    const res = await axios
      .patch(`team/updateTeamDetails/${teamid}`, reqObj)
      .then((res) => res)
      .catch((err) => err);
    if (res?.data?.status) {
      fetchTeamList();
      handleCloseModal();
    } else {
      toast.error(res?.response?.data?.message || "Failed to update team");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      updateTeam();
    } else {
      creaetTeam();
    }
  };

  return (
    <Modal
      onClose={close}
      open={open}
      center
      closeOnOverlayClick={false}
      showCloseIcon={false}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3"
      >
        <div className="relative">
          {/* Upper Color Picker Starts */}
          {openUpperColorPicker && (
            <div className="bg-gray-100 p-2 rounded-md absolute z-10 top-[34px] left-[3px]">
              <HexColorPicker color={upperColor} onChange={setUpperColor} />
              <button
                type="button"
                onClick={() => setOpenUpperColorPicker(false)}
                className="btn btn--border mt-3"
              >
                Done
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpenUpperColorPicker(true)}
            className="btn btn--border absolute z-10 right-2 top-8"
          >
            <span
              style={{
                backgroundColor: upperColor,
              }}
              className="rounded-full p-2"
            ></span>
          </button>
          {/* Upper Color Picker Ends */}
          {/* Bg Color Picker Starts */}
          {openBgColorPicker && (
            <div className="bg-gray-100 p-2 rounded-md absolute z-10 top-[34px] left-[3px]">
              <HexColorPicker color={bgColor} onChange={setBgColor} />
              <button
                type="button"
                onClick={() => setOpenBgColorPicker(false)}
                className="btn btn--border mt-3"
              >
                Done
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpenBgColorPicker(true)}
            className="btn btn--border absolute z-10 right-2 bottom-[80px]"
          >
            <span
              style={{
                backgroundColor: bgColor,
              }}
              className="rounded-full p-2"
            ></span>
          </button>
          {/* Bg Color Picker Ends */}
          <label>Preview</label>
          <TeamCard
            isPreview={true}
            data={{
              team_logo: data?.team_logo || "",
              team_name: data?.team_name || "",
              upper_card_color: upperColor,
              lower_card_color: bgColor,
            }}
          />
        </div>

        <div>
          <label>Logo URL </label>
          <input
            required
            onChange={(e) => handleSetData(e.target.value, fields.team_logo)}
            type="text"
            value={data.team_logo}
          />
        </div>
        <div>
          <label>Team Name</label>
          <input
            required
            onChange={(e) => handleSetData(e.target.value, fields.team_name)}
            type="text"
            value={data.team_name}
          />
        </div>
        <div>
          <label>Team Score</label>
          <input
            required
            onChange={(e) => handleSetData(e.target.value, fields.team_score)}
            type="number"
            value={data.team_score}
          />
        </div>
        <div>
          <label>Team Members</label>
          <div className="flex flex-wrap max-w-[300px] gap-2">
            {tags.map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    style={tagInputStyle}
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  key={tag}
                  closable={true}
                  style={{
                    userSelect: "none",
                  }}
                  onClose={() => handleClose(tag)}
                >
                  <span
                    onDoubleClick={(e) => {
                      setEditInputIndex(index);
                      setEditInputValue(tag);
                      e.preventDefault();
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={tagInputStyle}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag
                style={tagPlusStyle}
                icon={<PlusOutlined />}
                onClick={showInput}
              >
                Add Member
              </Tag>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button type="submit" className="btn">
            {isEdit ? "Update" : "Create team"}
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="btn btn--border"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTeam;
