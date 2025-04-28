import Map from "../../components/map";
import React, { useRef, useEffect, useState } from "react";
import Flag from "../flag";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import Search from "../search";
import { FaExpand } from "react-icons/fa";
import MouseTip from "./MouseTip";
import { countryToName } from "../../constants/country";
import { zoomIn, zoomOut } from "../../utils/mapFunctions";

const MapContainer = ({style, setExpand}) => {
  const [hoverCountryCode, setHoverCountryCode] = useState(null)
  const activeCountry = useSelector((state) => state.country.activeCountry) || ""
  const countryName = countryToName[activeCountry]
  const mapRef = useRef(null);
  const toolTipRef = useRef(null);

  const handleMouseMove = (e) => {
        const rect = mapRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        toolTipRef.current.style.transform = `translate(${x}px, ${y-30}px)`;
    }
  useEffect(() => {
    const map = mapRef.current
    const preventScrollOnMap = (event) => {
      if (mapRef.current && mapRef.current.contains(event.target)) {
        event.preventDefault();
      }
    };
    map.addEventListener('mousemove',handleMouseMove)
    window.addEventListener("wheel", preventScrollOnMap, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScrollOnMap);
      map.removeEventListener('mousemove',handleMouseMove)
    };
  }, []);

  const handleScroll = (event) => {
    if (event.deltaY < 0) zoomOut();
    else zoomIn();
  };
  
  const expandMap = () => {
    setExpand((prev) => !prev);
  };
  return (
    <div className={styles.mapFunction} style={style}>

      <div className={styles.upper}>
        <div className={styles.left}>
          <Flag />
          <label>{countryName}</label>
        </div>
        <Search />
      </div>

      <div
        id="mapContainer"
        className={styles.mapContainer}
        onWheel={handleScroll}
        ref={mapRef}
      >
        <div ref = {toolTipRef} className={styles.mouseTipOuter}>
          <MouseTip hoverCountryCode={hoverCountryCode}/>
        </div>
        <div className={styles.zoomContainer}>
          <button onClick={zoomOut} className={styles.zoomButton}>
            +
          </button>
          <button onClick={zoomIn} className={styles.zoomButton}>
            -
          </button>
        </div>
        <button onClick={expandMap} className={styles.expand}>
          <FaExpand />
        </button>
        <Map reference={mapRef} activeCountry={activeCountry} setHoverCountryCode={setHoverCountryCode}/>
      </div>
    </div>
  );
};
export default MapContainer;
