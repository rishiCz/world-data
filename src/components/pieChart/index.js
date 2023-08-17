import { useDispatch } from "react-redux";
import { setValues } from "../../store/slices/chartSlice";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import csvData from "../../assets/gdpCountry.csv";
import Chart from "react-apexcharts";
import Flag from "../flag";
import styles from './styles.module.css'

const PieChart=()=>{
const dispatch = useDispatch();
  const countryState = useSelector((state) => state.country);
  const chartState = useSelector((state) => state.chart);
  const activeCountry = countryState.activeCountry;
    const data={
        options: {width:'200px'},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
      }
    
      return (
        <>
        <div className={styles.pieHolder}>
            <Chart options={data.options} series={data.series} type="donut" width="380" />
        </div>
        </>
      );
}
export default PieChart