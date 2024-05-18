import React, { useEffect, useState, useRef } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import TeamCard from "../TeamCard/TeamCard";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag, theme, Tooltip } from "antd";
import { HexColorPicker } from "react-colorful";

const tagInputStyle = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

const CreateTeam = ({ open, close }) => {
  const [upperColor, setUpperColor] = useState("#FFCB03");
  const [bgColor, setBgColor] = useState("#1C2232");
  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
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

  return (
    <Modal
      onClose={close}
      open={open}
      center
      closeOnOverlayClick={false}
      showCloseIcon={false}
    >
      <form className="flex flex-col items-center gap-3">
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
          />
        </div>

        <div>
          <label>Team Logo</label>
          <input type="text" />
        </div>
        <div>
          <label>Team Name</label>
          <input type="text" />
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
        <div className="flex justify-end gap-3 w-full">
          <button type="button" onClick={close} className="btn btn--border">Cancel</button>
          <button className="btn">Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTeam;
