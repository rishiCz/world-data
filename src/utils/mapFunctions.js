import { useEffect } from "react";
import axios from "axios";
import {
  setActiveCountry,
} from "../store/slices/countrySlice";

const hoverColor = "#3E3E3EBA";
const hoverCancelColor = "#353535";
const hoverStrokeColor = "#464646";
const hoverCancelStrokeColor = "#464646";
const hoverCancelStrokeWidth = 1;
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

  const onMove = (e) => {
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
  };
  document.addEventListener("mousemove", (e) => {
    e.preventDefault();
    onMove(e);
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    map.style.cursor = "grab";
    document.removeEventListener("mousemove", onMove);
  });

  function updateTransform() {
    map.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }
};
const UpdateMap = () => {
  map = document.querySelector("#allSvg");
  map.style.scale++;
};
const onHover = () => {
  map.addEventListener("mouseover", function (element) {
    map.querySelectorAll(`.allPaths`).forEach((country) => {
      if (country.id === element.target.id) {
        country.style.stroke = hoverStrokeColor;
        country.style.fill = hoverColor;
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
const setCountryFromName = async (name,dispatch)=>{
  const data = await getCca3FromName(name);
      dispatch(setActiveCountry(data));
}
const Onclick = (dispatch) => {
  map.onclick = (element) => {
    element.stopPropagation();
    if (element.target.className.baseVal === "allPaths") {
      setCountryFromName(element.target.id,dispatch)
    }
  };
};
const zoom = (isZoomIn) => {
  let scale = map.style.scale;
  if (isZoomIn && map.style.scale < 20) {
    for (let i = 0; i < scale; i++) {
      map.style.scale++;
    }
  }

  if (!isZoomIn && map.style.scale > 1) {
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
  }, [dispatch]);
};
const getCca3FromName = async (name) => {
  try {
    const apiUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    const response = await axios.get(apiUrl);
    return response.data[0];
  } catch (error) {
    try {
      const apiUrl = `https://restcountries.com/v3.1/name/${name}`;
      const response = await axios.get(apiUrl);
      return response.data[0];
    } catch (e) {}
  }
};

const getCountryList = () => {
  const countryList = [];
  const countryMap = {};
  document.querySelectorAll(`.allPaths`).forEach((country) => {
    if (!countryMap[country.id]) {
      countryMap[country.id] = true;
      countryList.push(country.id);
    }
  });
  return countryList
};

export { zoom, SetMapProperties, getCountryList, setCountryFromName };