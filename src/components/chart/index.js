import { getJsonFromCsv } from "../../utils/functions";
import { useDispatch } from "react-redux";
import { setValues } from "../../store/slices/chartSlice";
import { useSelector } from "react-redux";
import React, { useEffect,useState } from "react";
import csvData from "../../assets/gdpCountry.csv";
import Chart from "react-apexcharts";
import Flag from "../flag";
import styles from './styles.module.css'

const ChartDisplay = () => {
  const [isData, setIsData] = useState(true)
  const dispatch = useDispatch();
  const countryState = useSelector((state) => state.country);
  const chartState = useSelector((state) => state.chart);
  const activeCountry = countryState.activeCountry;
  const xData = chartState.xValues;
  const yData = chartState.yValues;

  useEffect(() => {
    getJsonFromCsv(csvData).then((result) => {
      let xValues = [];
      let yValues = [];
      const organizedData = {};
      result.forEach((entry) => {
        const { Code, Year, GDP } = entry;
        if (!organizedData[Code]) {
          organizedData[Code] = [];
        }
        organizedData[Code].push({ year: Year, gdp: parseFloat(GDP) });
      });
      if (organizedData[activeCountry] === undefined) {
        setIsData(false)
        xValues.push("No Data Availale");
        yValues.push("No Data Availale");
      } else{
        setIsData(true)
        organizedData[activeCountry].forEach((gdpObj) => {
          xValues.push(gdpObj.year);
          yValues.push(gdpObj.gdp);
        })}
      dispatch(setValues({ xValues, yValues }));
    });
  }, [activeCountry]);
  const data = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: xData
          .filter((_, index) => (index - 5) % 5 === 0)
          .concat(xData[xData.length - 1]),
      },
    },
    series: [
      {
        name: "GDP per capita",
        data: yData
          .filter((_, index) => (index - 5) % 5 === 0)
          .concat(yData[yData.length - 1]),
      },
    ],
  };

  return (
    <>
    <div className={styles.flagHolder}>
        <Flag/>
        <label>{countryState.countryData.name?countryState.countryData.name.common:'' }</label>
    </div>
    { isData ? 
      <Chart
        options={data.options}
        series={data.series}
        type="area"
        width="99%"
      />
      :
      <h1>No Data Availale</h1>
      
      }
    </>
  );
};
export default ChartDisplay;
