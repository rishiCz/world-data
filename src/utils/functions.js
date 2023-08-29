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
        console.log(response[0])
        return response[0]
      } catch (error) {
        console.error("Error fetching data:", error)
        try{
            const apiUrl = `https://restcountries.com/v3.1/name/${name}`
            const response = await axios.get(apiUrl)
            if (!response.ok) {
                throw new Error("Network response was not ok")
              }
              return response[0]
        }
        catch(e){

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

export{SetMapProperty,zoomIn,zoomOut,getCountryFromName,getDataFromCountry}