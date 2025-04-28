import { SetMapProperties } from './mapFunctions'
import axios from 'axios'
const SetMapProperty = (dispatch) => SetMapProperties(dispatch)

const getCountryFromName = async (name) => {
  try {
    const apiUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`
    const response = await axios.get(apiUrl)

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return response[0]
  } catch (error) {
    try {
      const apiUrl = `https://restcountries.com/v3.1/name/${name}`
      const response = await axios.get(apiUrl)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response[0]
    }
    catch (e) {
      console.error("Error fetching data CRITICAL:", error)
    }
  }

}
const getDataFromCountry = async (countryCode) => {
  let data = null
  try {
    const res = await (axios.get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`))
    data = res.data[1]
  }
  catch (e) {
    console.log(e)
  }
  return data
}

const getLatestGDP = async (listCodes) => {

  if (!listCodes) {
    return { name: [], gdp: [] };
  }

  const requests = listCodes.map(async (countryCode) => {
    try {
      const res = await axios.get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`);

      // Ensure the response structure is as expected
      if (res.data && res.data[1] && res.data[1][1]) {
        const latestGdp = res.data[1][1];

        // Ensure that GDP value exists and is valid
        if (latestGdp.value) {
          const gdp = (latestGdp.value / 1000000000).toFixed(2); // Format GDP in billions
          return {
            name: latestGdp.country.value,
            gdp: parseFloat(gdp), // Convert the formatted string to a number
          };
        }
      }
      return null; // Return null if no valid GDP data found

    } catch (e) {
      console.error(e);
      return null; // Return null in case of an error
    }
  });

  const results = await Promise.all(requests);

  // Optional: Filter out any null values from results
  const validResults = results.filter(result => result !== null);
  const data = {
    name: validResults.map(result => result.name),
    gdp: validResults.map(result => result.gdp)
  };

  return data;
};





export { SetMapProperty, getCountryFromName, getDataFromCountry, getLatestGDP }