import countries from "world-countries";

export const countryToName = Object.fromEntries(countries.map(c => [c.cca2,c.name.common]))
export const countryTocca2 = Object.fromEntries(countries.map(c => [c.name.common,c.cca2]))
export const allCountries = countries.map(c => c.name.common)