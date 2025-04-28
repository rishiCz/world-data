import { useSelector } from "react-redux";
import { getLatestGDP } from "../../utils/functions";
import React, { useEffect, useState } from "react";

import styles from "./styles.module.css";
import countries from "world-countries";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Loader from "../Loader";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [values, setValues] = useState(null);
  const [isData, setIsData] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const activeCountry = useSelector((state) => state.country.activeCountry);

  // Function to get the borders (alpha-2 codes)
  const getBorders = (activeCountryCode) => {
    const countryData = countries.find((country) => country.cca2 === activeCountryCode);
    if (!countryData || !countryData.borders) {
      countryData.borders = []
    }
    return countryData.borders.map((cca3) => {
      const neighbor = countries.find((country) => country.cca3 === cca3);
      return neighbor ? neighbor.cca2 : null;
    }).filter(Boolean); // Filters out nulls
  };

  useEffect(() => {
    if (activeCountry) {
      const borders = getBorders(activeCountry);
      setIsLoading(true)

      getLatestGDP([activeCountry, ...borders]).then((result) => {
        if (result) {
          setIsData(true);
          setValues({
            xValues: result.name,
            yValues: result.gdp,
          });
        } else {
          setIsData(false);
        }
      }).finally(() => { setIsLoading(false) });

    }
  }, [activeCountry]);

  const data = {
    labels: values?.xValues?.slice(0, 9).map((val, ind) => `${val} \t \t $${values.yValues[ind]} B`) || [],
    datasets: [
      {
        label: 'GDP in $B',
        data: values?.yValues || [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#8AFFC1',
          '#FF8A8A',
          '#8AAEFF',
          '#FFD28A',
          '#A8FF8A',
          '#D28AFF',
        ]
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {

      legend: {
        position: 'right',
        // Position of the legend
        labels: {
          usePointStyle: true,   // Labels as circles
          pointStyle: 'circle',  // Point style (circle)
          padding: 10,
          font: {
            size: 12, // <- bigger labels for legend
          },           // Padding between legend and circle
        },
      },
    },
    cutout: '70%', // Optional: inner radius size
  };


  return (
    <div className={styles.outer}>
      <div>
        <div className={styles.currentGDP}>
          {isLoading &&
            <div className={styles.loader}>
              <Loader color={'#F96A6A'} size={50} />
            </div>


          }
          <h1>
            {values && values.xValues[0] ? `2023 GDP of ${values.xValues[0]} $${values.yValues[0]} B` : 'Error loading GDP'}
          </h1>


        </div>
        <div className={styles.pieHolder}>

          <h1>Adjacent Country Comparison</h1>
          {isLoading &&
            <div className={styles.loader}>
              <Loader color={'#F96A6A'} size={100} />
            </div>


          }
          <>
            {isData ? (
              <div className={styles.pie}>
                <Doughnut data={data} height={200} options={options} />
              </div>
            ) : (
              <h2>No Adjacent Country Data For Comparison</h2>
            )}
          </>

        </div>
      </div>
      <div className={styles.facts}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>What is GDP?</h1>
            <p>Gross Domestic Product (GDP) is a measure of the economic activity within a country. It represents the total value of goods and services produced over a specific time period within a nation.</p>
          </div>

          <div className={styles.section}>
            <h2>Key Concepts of GDP</h2>
            <p>GDP can be calculated using three approaches:</p>
            <ul>
              <li><strong>Production approach</strong>: Calculating GDP based on the value of goods and services produced in the economy.</li>
              <li><strong>Income approach</strong>: Calculating GDP based on the total income earned by individuals and businesses.</li>
              <li><strong>Expenditure approach</strong>: Calculating GDP based on total spending on goods and services in an economy.</li>
            </ul>
          </div>


        </div>

      </div>
    </div>
  );
};

export default PieChart;
