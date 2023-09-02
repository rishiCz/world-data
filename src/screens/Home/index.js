import MapContainer from "../../components/mapContainer";
import ChartDisplay from "../../components/chart";
import styles from "./styles.module.css";
import PieChart from "../../components/pieChart";

const Home = () => {
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
      <h2>GDP : {303030} B</h2>
      <div className={styles.pieContainer}>
        <PieChart />
      </div>
    </>
  );
};
export default Home;
