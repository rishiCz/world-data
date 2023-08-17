import { createSlice } from "@reduxjs/toolkit";
import {getCca3FromName} from "../../utils/functions";

const initialState = {
  activeCountry : 'IND',
  hoverCountry : 'IND',
  countryData:{name:{common:'India'},flags:{png:'https://flagcdn.com/w320/in.png'}}
};
export const country = createSlice({
  name: "country",
  initialState,
  reducers: {
    setActiveCountry: (state, action) => {
      state.countryData=action.payload
      state.activeCountry=action.payload.cca3
    },
    setHoverCountry: (state, action) => {
      state.hoverCountry=action.payload
    }
  },
});

export const {
  setActiveCountry,
  setHoverCountry
} = country.actions;

export default country.reducer;
