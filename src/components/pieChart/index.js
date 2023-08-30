import { useDispatch } from "react-redux";
import { setPieValues } from "../../store/slices/chartSlice";
import { useSelector } from "react-redux";
import { getLatestGDP } from "../../utils/functions";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Flag from "../flag";
import styles from "./styles.module.css";

const PieChart = () => {
  const[values,setValues] = useState(null)
  const dispatch = useDispatch();
  const countryState = useSelector((state) => state.country);
  const chartState = useSelector((state) => state.chart);
  const countryData = countryState.countryData;

  useEffect(() => {
    if(countryData.borders)
    getLatestGDP([countryData.cca3,...countryData.borders]).then((result) => {
      if(result)
      setValues({xValues: result.name, yValues: result.gdp})
    });
  }, [countryData]);
  const data = {
    series: values? values.yValues : [],
    options: {
      labels: values? values.xValues : [] ,
    },
  };

  return (
    <>
      <div className={styles.pieHolder}>
        <Chart
          options={data.options}
          series={data.series}
          type="donut"
          width="40%"
        />
      </div>
    </>
  );
};
export default PieChart;
