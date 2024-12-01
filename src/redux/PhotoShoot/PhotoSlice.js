import { createSlice } from "@reduxjs/toolkit";

const PhotoSlice = createSlice({
  name: "photos",
  initialState: [],
  reducers: {
    addImage: (state, action) => {
      console.log("action.payload>>", action.payload);
      state.push(action.payload);
    },
  },
});

export const { addImage } = PhotoSlice.actions;
export default PhotoSlice.reducer;
