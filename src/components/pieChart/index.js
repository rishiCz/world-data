import { useSelector } from "react-redux";
import { getLatestGDP } from "../../utils/functions";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styles from "./styles.module.css";
import "./styles.css";

const PieChart = () => {
  const [values, setValues] = useState(null);
  const [isData, setIsData] = useState(false);
  const countryState = useSelector((state) => state.country);
  const countryData = countryState.countryData;

  useEffect(() => {
    if (countryData.borders)
      getLatestGDP([countryData.cca3, ...countryData.borders]).then(
        (result) => {
          if (result){
            setIsData(true)
            setValues({ xValues: result.name, yValues: result.gdp })
          }
        }
      )
    else setIsData(false)
  }, [countryData]);
  const data = {
    series: values ? values.yValues : [],
    options: {
      labels: values ? values.xValues : [],
    },
  };

  return (
    <>
    <div className={styles.outer}>
      <div className={styles.pieHolder}>
        {isData ?
          <Chart className="pieChart"
          options={data.options}
          series={data.series}
          width={'100%'}
          type="donut"
        /> 
      :
      <h1>No Adjacent Country Data For Comparison</h1>}
      </div>
      <div className={styles.facts}>
        <h1>GD.. what?</h1>
        <h3>Gross Domestic Product (GDP) is a key economic indicator that measures the total value of all goods and services produced within a country's borders over a specific period.</h3>
        <h3>Simon Kuznets, an economist, is often credited with developing the concept of GDP in the 1930s.</h3>
        <h3>Japan has a high GDP for its size due to its advanced technology and manufacturing industries.</h3>
        <h3>GDP per capita can vary greatly within a single country, with urban areas typically having higher income levels than rural areas.</h3>
        <h3>India's GDP has been steadily increasing over the years, and it recently crossed the $3 trillion mark, reflecting its growing economic significance on the world stage.</h3>
        <div className={styles.facts}>

        </div>
      </div>
    </div>
      
    </>
  );
};
export default PieChart;
