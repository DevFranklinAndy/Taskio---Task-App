import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  taskioUser: "" || {} || null,
  toggleCreateNewTask: false,
  toggleSideBar: false,
};

export const ReduxStates = createSlice({
  name: "taskio",
  initialState,
  reducers: {
    taskioUserDetails: (state, { payload }) => {
      state.taskioUser = payload;
    },
    taskioLogOut: (state) => {
      state.taskioUser = null;
      toast.success("Logout Successfully");
    },
    toggleCreateNewTask: (state, { payload }) => {
      state.toggleCreateNewTask = payload;
    },
    toggleSideBarState: (state, { payload }) => {
      state.toggleSideBar = payload;
    },
  },
});

export const {
  taskioUserDetails,
  toggleSideBarState,
  taskioLogOut,
  toggleCreateNewTask,
} = ReduxStates.actions;

export default ReduxStates.reducer;
