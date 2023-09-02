import {zoom,SetMapProperties} from './mapFunctions'
import axios from 'axios'
const SetMapProperty = (dispatch)=> SetMapProperties(dispatch)
const zoomIn =() => zoom(true)
const zoomOut =() => zoom(false)

const getCountryFromName =async(name)=>{
    try {
        const apiUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`
        const response = await axios.get(apiUrl)
        
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response[0]
      } catch (error) {
        try{
            const apiUrl = `https://restcountries.com/v3.1/name/${name}`
            const response = await axios.get(apiUrl)
            if (!response.ok) {
                throw new Error("Network response was not ok")
              }
              return response[0]
        }
        catch(e){
          console.error("Error fetching data CRITICAL:", error)
        }
      }
    
}
const getDataFromCountry = async (countryCode) =>{
  let data = null
  try{
      const res = await(axios.get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`))
      data =res.data[1]
  }
  catch(e){
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
      const latestGdp = res.data[1][0];

      if (latestGdp.value) {
        const gdp = (latestGdp.value / 1000000000).toFixed(2);
        return {
          name: `
            <div class='pieLabel'>
              <label> ${latestGdp.country.value} </label>
              <label> ${gdp} B </label>
            </div>`,
          gdp: parseFloat(gdp)
        };
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  const results = await Promise.all(requests);
  const validResults = results.filter(result => result != null);
  const data = {
    name: validResults.map(result => result.name),
    gdp: validResults.map(result => result.gdp)
  };

  return data;
};





export{SetMapProperty,zoomIn,zoomOut,getCountryFromName,getDataFromCountry,getLatestGDP}