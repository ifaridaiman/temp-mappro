import React, {useState} from 'react'
import Graphic from "@arcgis/core/Graphic";
import Geometry from "@arcgis/core/geometry/Geometry.js";


export const useMapGraphic = () => {

    const [stateCollection, setStateCollection] = useState<any[]>([]);


    let polylineSymbol = {
        type: "simple-fill",  // autocasts as SimpleLineSymbol()
        color: [128, 128, 128, 0.4],  // gray with 40% opacity
        outline: {
          color: [0, 255, 0],  // green outline (RGB format)
          width: 4
        }
      };
      
    
      const createHighlightGraphic = (geometry:Geometry) => {
        return new Graphic({
          geometry,
          symbol: polylineSymbol,
        });
      };
  return {createHighlightGraphic, stateCollection, setStateCollection}
}