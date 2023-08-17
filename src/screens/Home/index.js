import MapContainer from "../../components/mapContainer"
import ChartDisplay from '../../components/chart'
import styles from "./styles.module.css"
import PieChart from "../../components/pieChart"

const Home = () => {
  
  return (
    <>
      <div className={styles.homeDiv}>
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
