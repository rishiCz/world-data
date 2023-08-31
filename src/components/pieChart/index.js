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
          console.log(result)
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
      <div className={styles.pieHolder}>
        {isData ?
          <Chart class="pieChart"
          options={data.options}
          series={data.series}
          type="donut"
          width="40%"
          height="500px"
        /> 
      :
      <h1>No Adjacent Country Data For Comparison</h1>}
      </div>
    </>
  );
};
export default PieChart;
