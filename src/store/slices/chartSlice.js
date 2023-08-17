import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  xValues : [0],
  yValues : [0]
};
export const chart = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setValues: (state, action) => {
      state.xValues=action.payload.xValues
      state.yValues=action.payload.yValues
    },
  },
});

export const {
  setValues,
} = chart.actions;

export default chart.reducer;
