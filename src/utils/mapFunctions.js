import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import axios from 'axios'
import {
  setActiveCountry,
  // setHoverCountry,
} from "../store/slices/countrySlice";

const hoverColor = "#ffffff7f";
const hoverCancelColor = "#0A2647";
const hoverStrokeColor = "#ffffff";
const hoverCancelStrokeColor = "#89add8";
const hoverStrokeWidth = 0.5;
const hoverCancelStrokeWidth = 0.1;
let map = null;

const onDrag = () => {
  const mapContainer = document.querySelector("#mapContainer");

  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let translateX = 0;
  let translateY = 0;

  const maxX = 100;
  const maxY = 100;

  mapContainer.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isDragging = true;
    e.preventDefault();
    mapContainer.style.cursor = "grabbing";
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  });

  const onMove = (e)=>{
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;

    translateX += deltaX / map.style.scale;
    translateY += deltaY / map.style.scale;

    // Constrain the translation within bounds
    translateX = Math.max(
      -maxX * map.style.scale,
      Math.min(translateX, maxX * map.style.scale)
    );
    translateY = Math.max(
      -maxY * map.style.scale,
      Math.min(translateY, maxY * map.style.scale)
    );

    dragStartX = e.clientX;
    dragStartY = e.clientY;

    updateTransform();
  }
  document.addEventListener("mousemove", (e) => {
    e.preventDefault()
    onMove(e)
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    map.style.cursor = "grab";
    document.removeEventListener("mousemove",onMove)
  });

  function updateTransform() {
    map.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }
};
const UpdateMap = () => {
  map = document.querySelector("#allSvg");
  map.style.scale++
};
const onHover = () => {
  map.addEventListener("mouseover", function (element) {
    map.querySelectorAll(`.allPaths`).forEach((country) => {
      if (country.id === element.target.id) {
        country.style.stroke = hoverStrokeColor;
        country.style.fill = hoverColor;
        country.style.strokeWidth = `${hoverStrokeWidth / map.style.scale}px`;
      }
    });
    element.target.addEventListener("mouseleave", function (element) {
      map.querySelectorAll(`.allPaths`).forEach((country) => {
        if (country.id === element.target.id) {
          country.style.stroke = hoverCancelStrokeColor;
          country.style.fill = hoverCancelColor;
          country.style.strokeWidth = `${hoverCancelStrokeWidth}px`;
        }
      });
    });
  });
};
const Onclick = (dispatch) => {
  map.onclick = async(element) => {
    element.stopPropagation();
    if(element.target.className.baseVal === "allPaths" ){
      const data = await getCca3FromName(element.target.id)
      dispatch(setActiveCountry(data))
    }
  };
};
const zoom = (isZoomIn) => {
  let scale= map.style.scale
  if (isZoomIn && map.style.scale < 20){
  for (let i = 0; i < scale; i++) {
    map.style.scale++;
  }
}
   
  if (!isZoomIn && map.style.scale > 1){
  for (let i = Math.sqrt(scale); i >= 1; i--) {
    map.style.scale--;
  }
}
};
const SetMapProperties = (dispatch) => {
  useEffect(() => {
    UpdateMap();
    onDrag();
    Onclick(dispatch);
    onHover();
  },[]);
};
const getCca3FromName =async(name)=>{
  try {
      const apiUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
      const response = await axios.get(apiUrl);
      return response.data[0];
    } catch (error) {
      console.error("Error fetching data:", error);
      try{
          const apiUrl = `https://restcountries.com/v3.1/name/${name}`;
          const response = await axios.get(apiUrl);
          return response.data[0];
      }
      catch(e){

      }
    }
  
}


export { zoom, SetMapProperties };
