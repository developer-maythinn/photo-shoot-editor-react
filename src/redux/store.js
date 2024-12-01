const { configureStore } = require("@reduxjs/toolkit");
import PhotoSliceReducer from "./PhotoShoot/PhotoSlice";

export const store = configureStore({
  reducer: {
    photos: PhotoSliceReducer,
  },
});
