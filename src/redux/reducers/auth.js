import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../helpers/axios";

const initialState = {
  profile: {
    subscribed_team: [],
    notification_preferences: [],
  },
  notification: [],
};

export const logOutApi = createAsyncThunk("auth/logOut", async () => {
  try {
    const response = await axios.post("auth/logout");
    sessionStorage.removeItem("authToken");
    return response.data;
  } catch (err) {
    throw err;
  }
});

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.profile = action?.payload || {};
    },
    clearAllUserData: (state) => {
      state.profile = {};
    },
    setTeamSubscription: (state, action) => {
      state.profile.subscribed_team = [
        ...(state?.profile?.subscribed_team || []),
        action.payload,
      ];
      state.profile.notification_preferences = [
        ...(state?.profile?.notification_preferences || []),
        {
          teamId: action.payload,
          teamMemberUpdate: true,
          scoreUpdate: true,
        },
      ];
    },
    removeTeamSubscription: (state, action) => {
      state.profile.subscribed_team = state?.profile?.subscribed_team.filter(
        (i) => i !== action.payload
      );
      state.profile.notification_preferences =
        state?.profile?.notification_preferences.filter(
          (i) => i.teamId !== action.payload
        );
    },
    setNotification: (state, action) => {
      if (Array.isArray(action.payload)) {
        const messages = action.payload.map((item) => ({
          read: false,
          messages: item.value,
        }));
        state.notification = [...state.notification, ...messages];
      } else {
        state.notification = [
          ...state.notification,
          { read: false, messages: action.payload },
        ];
      }
    },
    clearAllNotification: (state) => {
      state.notification = [];
    },
    readAllNotification: (state) => {
      state.notification = state.notification.map((item) => ({
        ...item,
        read: true,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOutApi.fulfilled, (state, action) => {
      state.profile = {};
    });
  },
});

export const {
  setUserData,
  clearAllUserData,
  setTeamSubscription,
  removeTeamSubscription,
  readAllNotification,
  clearAllNotification,
  setNotification,
} = authReducer.actions;
export default authReducer.reducer;
