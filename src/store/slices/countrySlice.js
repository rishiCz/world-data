import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCountry: "IN",
  hoverCountry: 'IN'
};
export const country = createSlice({
  name: "country",
  initialState,
  reducers: {
    setActiveCountry: (state, action) => {
      state.activeCountry = action.payload;
    },
    setHoverCountry: (state, action) => {
      state.hoverCountry = action.payload;
    },
    setGdp: (state, action) => {
      state.gdp = action.payload;
    },
  },
});

export const { setActiveCountry, setHoverCountry, setGdp } = country.actions;

export default country.reducer;
