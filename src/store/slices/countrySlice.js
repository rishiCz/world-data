import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCountry: "IND",
  hoverCountry: "IND",
  countryData: {
    name: { common: "India" },
    cca3: 'IND',
    flags: { png: "https://flagcdn.com/w320/in.png" },
    borders: ["BGD", "BTN", "MMR", "CHN", "NPL", "PAK"]
  },
};
export const country = createSlice({
  name: "country",
  initialState,
  reducers: {
    setActiveCountry: (state, action) => {
      state.countryData = action.payload;
      state.activeCountry = action.payload.cca3;
    },
    setHoverCountry: (state, action) => {
      state.hoverCountry = action.payload;
    },
  },
});

export const { setActiveCountry, setHoverCountry } = country.actions;

export default country.reducer;
