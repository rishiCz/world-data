import {zoom,SetMapProperties} from './mapFunctions'
import axios from 'axios'
import Jparse from 'papaparse'
import { country } from '../store/slices/countrySlice'
export const print=(text)=>{
    console.log(text)
}
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
const getLatestGDP=async(listCodes)=>{
  let data = {name:[],gdp:[]}

  if(listCodes)
  for (let countryCode of listCodes){
    try{
      const res = await(axios.get(`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`))
      const latestGdp = res.data[1][0]
      if(latestGdp.value){
        const gdp = (latestGdp.value/1000000000).toFixed(2)
        data.name.push(latestGdp.country.value + ' :  '+ gdp)
        data.gdp.push(parseFloat(gdp))
        console.log()
      }
  }
  catch(e){
      console.log(e)
  }
  };
  
  return data
}

export{SetMapProperty,zoomIn,zoomOut,getCountryFromName,getDataFromCountry,getLatestGDP}