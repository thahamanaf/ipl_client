import React, { useEffect, useState, useRef } from "react";
import Modal from "react-responsive-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  readAllNotification,
  clearAllNotification,
} from "../../redux/reducers/auth";
import { IoMdClose } from "react-icons/io";

const Notification = ({ open, close }) => {
  const initialRendering = useRef(true);
  const notification = useSelector((state) => state.auth.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (initialRendering?.current) {
      dispatch(readAllNotification());
      initialRendering.current = false;
    }
  }, [notification]);

  const removeAllNotifications = () => {
    dispatch(clearAllNotification());
  }

  return (
    <Modal open={open} onClose={close} showCloseIcon={false} center>
      <div className="flex flex-col gap-2 max-w-[600px]">
        <div className="flex border-b py-3 items-center justify-between gap-10">
          <h1 className="text-lg font-semibold ">Notification List</h1>
          <div className="flex items-center gap-3">
          <button onClick={removeAllNotifications} className="btn btn--red">Clear All</button>
          <button onClick={close} className="btn btn--border"><IoMdClose/></button>
          </div>
        </div>
        {notification.length
          ? notification.map((item, index) => (
              <p key={`${index}_notfi`} className="border-b break-words">
                {item.messages}
              </p>
            ))
          : "No new notifications"}
      </div>
    </Modal>
  );
};

export default Notification;
