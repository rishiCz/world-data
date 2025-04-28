import MapContainer from "../../components/mapContainer";
import ChartDisplay from "../../components/chart";
import styles from "./styles.module.css";
import PieChart from "../../components/pieChart";
import {FaGithub} from "react-icons/fa";
import { useState } from "react";

const Home = () => {
  const [isExpand, setExpand] = useState(false)
  const style = isExpand
  ? {
    flexBasis: "100%",
    height:`calc(100vh - ${100}px)`
  }
  : {};
  return (
    <>
      <header>
        <h1>World GDP</h1>
        <a className={styles.gitLink} target="" href="https://github.com/rishiCz/world-data">
          Source
          <FaGithub className={styles.gitIcon}/>
        </a>
      </header>
      <div className={styles.upper} >
        <MapContainer style={style} setExpand={setExpand}/>
        <div className={styles.chartContainer} style={style}>
          <ChartDisplay />
        </div>
      </div>
      

      <div className={styles.bottom}>
       
          <PieChart/>
 
        
        
      </div>
    </>
  );
};
export default Home;
