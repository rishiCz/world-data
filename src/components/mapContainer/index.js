import Map from "../../components/map"
import React, { useRef, useEffect } from 'react';
import { zoomIn, zoomOut } from "../../utils/functions"
import styles from "./styles.module.css"

const MapContainer=()=>{
    const mapRef = useRef(null);
    useEffect(() => {
      const preventScrollOnMap = (event) => {
        if (mapRef.current && mapRef.current.contains(event.target)) {
          event.preventDefault();
        }
      };
  
      window.addEventListener('wheel', preventScrollOnMap, { passive: false });
  
      return () => {
        window.removeEventListener('wheel', preventScrollOnMap);
      };
    }, []);
  
    const handleScroll = (event) => {
      if (event.deltaY < 0) zoomIn()
      else zoomOut()
    }

    return(<div className={styles.mapFunction}>
        <button onClick={zoomIn} className={styles.zoomButton}>
          +
        </button>
        <button onClick={zoomOut} className={styles.zoomButton}>
          -
        </button>
        <div id="mapContainer" className={styles.mapContainer} onWheel={handleScroll} ref={mapRef}>
          <Map reference = {mapRef} />
        </div>
      </div>)
}
export default MapContainer