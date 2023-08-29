import MapContainer from "../../components/mapContainer"
import ChartDisplay from '../../components/chart'
import styles from "./styles.module.css"
import PieChart from "../../components/pieChart"

const Home = () => {
  
  return (
    <>
      <div className={styles.homeDiv}>
        <h1>This project is <label style={{color: 'red'}}>IN-PROGRESS</label> and gets updated almost daily </h1>
        <h2 style={{color: 'green'}}> Last Update: 29 Aug 2023</h2>
        
        <MapContainer/>
        <div className={styles.chartContainer}>
          <ChartDisplay/>
        </div>
        <div className={styles.pieContainer}>
        <PieChart/>
        </div>
      </div>
    </>
  )
}
export default Home
