import { getDataFromCountry } from "../../utils/functions";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { setGdp } from "../../store/slices/countrySlice";
import Chart from "react-apexcharts";
import Loader from "../Loader";
import styles from './styles.module.css'

const ChartDisplay = () => {
  const [isData, setIsData] = useState(true);
  const [values, setValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();
  const countryState = useSelector((state) => state.country);
  const activeCountry = countryState.activeCountry;



  useEffect(() => {
    const updateCountryData = async () => {
      setIsLoading(true)
      const result = await getDataFromCountry(activeCountry)
      const xValues = [];
      const yValues = [];
      if (result) {
        dispatch(setGdp(result[1].value))
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
      setIsLoading(false)
    }
    updateCountryData()
  }, [activeCountry, dispatch]);
  const data = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: values ? values.xValues
          .filter((_, index) => (index - 5) % 5 === 0)
          .concat(values.xValues[values.xValues.length - 1]) : [],
      },
    },
    series: [
      {
        name: "GDP in $",
        data: values ? values.yValues
          .filter((_, index) => (index - 5) % 5 === 0)
          .concat(values.yValues[values.yValues.length - 1]) : [],
      }
    ],
  };

  return (
    <div className={styles.chartHolder}>
      {isLoading &&
        <div className={styles.loader}>
          <Loader color={'#008FFB'} size={50} />
        </div>
       
      }
       
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

    </div>
  );
};
export default ChartDisplay;
