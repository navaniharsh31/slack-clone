import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

export const { enterRoom } = mainSlice.actions;

export const selectRoomId = (state) => state.main.roomId;

export default mainSlice.reducer;
