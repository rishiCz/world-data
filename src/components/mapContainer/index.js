import Map from "../../components/map";
import React, { useRef, useEffect, useState } from "react";
import { zoomIn, zoomOut } from "../../utils/functions";
import Flag from "../flag";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import Search from "../search";
import { FaExpand } from "react-icons/fa";

const MapContainer = () => {
  const countryName = useSelector((state) => state.country).countryData.name
    .common;
  const mapRef = useRef(null);
  useEffect(() => {
    const preventScrollOnMap = (event) => {
      if (mapRef.current && mapRef.current.contains(event.target)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScrollOnMap, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScrollOnMap);
    };
  }, []);

  const handleScroll = (event) => {
    if (event.deltaY < 0) zoomIn();
    else zoomOut();
  };
  const [isExpand, setExpand] = useState(false);
  const expandMap = () => {
    setExpand((prev) => !prev);
  };
  const style = isExpand
    ? {
        flexBasis: "100%",
      }
    : {};
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
        style={{aspectRatio: (isExpand? 2.5 : 'unset')}}
        onWheel={handleScroll}
        ref={mapRef}
      >
        <div className={styles.zoomContainer}>
          <button onClick={zoomIn} className={styles.zoomButton}>
            +
          </button>
          <button onClick={zoomOut} className={styles.zoomButton}>
            -
          </button>
        </div>
        <button onClick={expandMap} className={styles.expand}>
          <FaExpand />
        </button>
        <Map reference={mapRef} />
      </div>
    </div>
  );
};
export default MapContainer;
