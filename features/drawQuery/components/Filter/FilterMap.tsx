"use client";
import React, { useState, useEffect } from "react";
import { useDrawQuery } from "../../hooks/useDrawQuery";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { useMapGraphic } from "../../hooks/useMapGraphic";
import { useThemeContext } from "@/context/ThemeContext";
import { ArahanTypeEnum, NoSiriEnum } from "../../enum/formEnum";
import { useDrawQueryContext } from "../../DrawQueryContext";

const FilterMap = () => {
  const {
    noLembar,
    handleNoLembar,
    district,
    handleDistrict,
    state,
    handleState,
    mukim,
    handleMukim,
  } = useDrawQuery();
  const {
    selectedArahan,
    setSelectedArahan,
    selectedNoSiri,
    setSelectedNoSiri,
  } = useDrawQueryContext();
  const [graphicsLayer] = useState(new GraphicsLayer());
  const { createHighlightGraphic, stateCollection } = useMapGraphic();
  const { mapView } = useThemeContext();

  // Add graphicsLayer to the map when mapView is ready
  useEffect(() => {
    if (mapView && !mapView.map.findLayerById(graphicsLayer.id)) {
      mapView.map.add(graphicsLayer);
    }
  }, [mapView, graphicsLayer]);

  // Handler to zoom to the selected state's geometry
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStateName = event.target.value;
    handleState(event as any); // Continue with the existing handler

    // Find the selected state's geometry from stateCollection
    const selectedState = stateCollection.find(
      (negeri) => negeri.attributes.NAM === selectedStateName
    );

    if (selectedState && selectedState.geometry) {
      const stateExtent = selectedState.geometry.extent;

      // Clear any existing graphics in the GraphicsLayer
      graphicsLayer.removeAll();

      // Create and add the highlight graphic
      const highlightGraphic = createHighlightGraphic(selectedState.geometry);
      graphicsLayer.add(highlightGraphic);

      // Use view.goTo to zoom into the selected state's extent
      mapView?.goTo({
        target: stateExtent,
        zoom: 8, // Adjust zoom level as needed
      });
    }
  };
  return (
    <>
      <p className="text-white mt-2 mb-8 text-base font-light">
        Sila lukis AOI untuk memilih lembar
      </p>
      <div className="mb-4">
        <label className="text-xs text-white">Negeri</label>
        <select
          className="h-10 rounded text-base p-2 w-full"
          value={state.join(",")}
          onChange={handleStateChange} // Updated to use handleStateChange
        >
          <option value="">Pilih Negeri</option>
          {stateCollection.map((negeri, index) => (
            <option key={index} value={negeri.attributes.NAM}>
              {negeri.attributes.NAM}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="text-xs text-white">Daerah</label>
        <select
          className="h-10 rounded text-base p-2 w-full"
          value={state.join(",")}
          onChange={handleStateChange} // Updated to use handleStateChange
        >
          <option value="">Pilih Daerah</option>
          {stateCollection.map((negeri, index) => (
            <option key={index} value={negeri.attributes.NAM}>
              {negeri.attributes.NAM}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="text-xs text-white">Mukim</label>
        <select
          className="h-10 rounded text-base p-2 w-full"
          value={state.join(",")}
          onChange={handleStateChange} // Updated to use handleStateChange
        >
          <option value="">Pilih Mukim</option>
          {stateCollection.map((negeri, index) => (
            <option key={index} value={negeri.attributes.NAM}>
              {negeri.attributes.NAM}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FilterMap;
