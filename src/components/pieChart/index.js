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
    </div>
      
    </>
  );
};
export default PieChart;
