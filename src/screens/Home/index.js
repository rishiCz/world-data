import MapContainer from "../../components/mapContainer";
import ChartDisplay from "../../components/chart";
import styles from "./styles.module.css";
import PieChart from "../../components/pieChart";
import { useSelector } from "react-redux";

const Home = () => {
  const gdp = useSelector((state)=> state.country).gdp
  return (
    <>
      <header>
        <h1>World GDP</h1>
      </header>
      <div className={styles.upper}>
        <MapContainer />
        <div className={styles.chartContainer}>
          <ChartDisplay />
        </div>
      </div>
      <div className={styles.gdp}>
        <h2>2022 GDP : {gdp? `${gdp.toLocaleString().split('.')[0]} USD`: "Not Available"}</h2>
      </div>
      
      <div className={styles.pieContainer}>
        <PieChart />
      </div>
    </>
  );
};
export default Home;
