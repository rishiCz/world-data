import { getDataFromCountry } from "../../utils/functions";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { setGdp } from "../../store/slices/countrySlice";
import Chart from "react-apexcharts";
import styles from "./styles.module.css";

const ChartDisplay = () => {
  const [isData, setIsData] = useState(true);
  const [values, setValues] = useState(null);
  const dispatch = useDispatch();
  const countryState = useSelector((state) => state.country);
  const activeCountry = countryState.activeCountry;

  useEffect(() => {
    getDataFromCountry(activeCountry).then((result) => {
      const xValues = [];
      const yValues = [];
      if (result) {
        dispatch(setGdp(result[0].value))
        result.reverse().forEach((entry) => {
          setIsData(true);
          if (entry.value) {
            xValues.push(entry.date);
            yValues.push((entry.value / 1000000000).toFixed(2));
          }
        });
      } else {
        setIsData(false);
        xValues.push("noData");
        yValues.push("noData");
      }
      setValues({ xValues: xValues, yValues: yValues });
    });
  }, [activeCountry]);
  const data = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: values? values.xValues
          .filter((_, index) => (index - 5) % 5 === 0)
          .concat(values.xValues[values.xValues.length - 1]) : [],
      },
    },
    series: [
      {
        name: "GDP per capita",
        data: values? values.yValues
          .filter((_, index) => (index - 5) % 5 === 0)
          .concat(values.yValues[values.yValues.length - 1]): [],
      }
    ],
  };

  return (
    <>
      {isData ? (
        <Chart
          options={data.options}
          series={data.series}
          type="area"
          width="100%"
          height="100%"
        />
      ) : (
        <h1>No Data Availale</h1>
      )}
    </>
  );
};
export default ChartDisplay;
