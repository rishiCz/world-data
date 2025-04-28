export let map = null;
export let isDragging = false;
export let dragStartX = 0;
export let dragStartY = 0;
export let translateX = 0;
export let translateY = 0;

const maxX = 100;
const maxY = 100;

const onDrag = () => {
  const mapContainer = document.querySelector("#mapContainer");
  const getEventPosition = (e) => {
    if (e.type.startsWith('mouse')) {
      return { x: e.clientX, y: e.clientY };
    } else if (e.type.startsWith('touch')) {
      const touch = e.touches[0] || e.changedTouches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleMouseDown = (e) => {
    
    // e.stopPropagation();
    const { x, y } = getEventPosition(e);
    isDragging = true;
    // if (e.cancelable) e.preventDefault();
    // e.preventDefault();
    mapContainer.style.cursor = "grabbing";
    dragStartX = x;
    dragStartY = y;
  };

  const handleOnMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const { x, y } = getEventPosition(e);

    const deltaX = x - dragStartX;
    const deltaY = y - dragStartY;

    translateX += deltaX / map.style.scale;
    translateY += deltaY / map.style.scale;

    translateX = Math.max(
      -maxX * map.style.scale,
      Math.min(translateX, maxX * map.style.scale)
    );
    translateY = Math.max(
      -maxY * map.style.scale,
      Math.min(translateY, maxY * map.style.scale)
    );

    dragStartX = x;
    dragStartY = y;

    updateTransform();
  };

  const handleMouseUp = (e) => {
    isDragging = false;
    mapContainer.style.cursor = "grab";
  };

  mapContainer.addEventListener("mousedown", handleMouseDown);
  mapContainer.addEventListener("touchstart", handleMouseDown, { passive: false });

  document.addEventListener("mousemove", handleOnMouseMove);
  document.addEventListener("touchmove", handleOnMouseMove, { passive: false });

  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("touchend", handleMouseUp);

  const updateTransform = () => {
    map.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }
};
const UpdateMap = () => {
  map = document.querySelector("#allSvg");
  map.style.scale++;
};

export const zoomIn = () => {
  let scale = map.style.scale;
  if (map.style.scale > 1) {
    for (let i = Math.sqrt(scale); i >= 1; i--) {
      map.style.scale--;
    }
  }
}

export const zoomOut = () => {
  let scale = map.style.scale;
  if (map.style.scale < 20) {
    for (let i = 0; i < scale; i++) {
      map.style.scale++;
    }
  }
}
export const SetMapProperties = (dispatch) => {

  UpdateMap();
  onDrag();

};