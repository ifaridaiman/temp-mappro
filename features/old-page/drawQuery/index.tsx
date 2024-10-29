"use client";
import { useThemeContext } from "@/context/ThemeContext";
import React, { useState, useEffect } from "react";
import { useDrawQuery } from "./hooks/useDrawQuery";
import { stateFeatureLayer } from "@/components/map/FeatureLayer/featureLayers";
import Query from "@arcgis/core/rest/support/Query";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Geometry from "@arcgis/core/geometry/Geometry.js";
import { useMapGraphic } from "./hooks/useMapGraphic";
import FormStep1 from "./formComponents/formStep1";
import { ArahanTypeEnum } from "./enum/formEnum";
import FormStep2 from "./formComponents/formStep2";
import { DrawQueryProvider, useDrawQueryContext } from "./DrawQueryContext";
const DrawQuery = () => {
  const { step, nextStep, prevStep, selectedArahan } = useDrawQueryContext();

  const { setStateCollection } = useMapGraphic();

  useEffect(() => {
    const fetchFeatures = async () => {
      const stateQuery = stateFeatureLayer.createQuery();
      stateQuery.returnGeometry = true;
      stateQuery.outFields = ["NAM"];

      try {
        const response = await stateFeatureLayer.queryFeatures(stateQuery);
        const features = response.features;

        // Collect the attributes and geometries
        const stateCollection = features.map((feature) => ({
          attributes: feature.attributes,
          geometry: feature.geometry, // This will give you the geometry of each feature
        }));

        setStateCollection(stateCollection);
        console.log("Feature Collection:", stateCollection);
      } catch (error) {
        console.error("Error querying features:", error);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <DrawQueryProvider>
      <div className="overflow-y-auto max-h-[45rem]">
        {step === 0 && <FormStep1 />}

        {step === 1 && <FormStep2 />}

        {step === 2 && (
          <>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-white">Nota</label>
              <textarea
                className=" h-auto rounded text-base p-2"
                rows={8}
                cols={35}
              ></textarea>
            </div>
          </>
        )}
      </div>

      <div>
        {step < 2 && (
          <button
            onClick={nextStep}
            className="bg-white text-black h-10 w-full rounded-md mb-4"
          >
            Seterusnya
          </button>
        )}
        {step > 0 && (
          <div className="flex flex-col gap-4">
            <button
              onClick={prevStep}
              className="bg-white text-black h-10 w-full rounded-md"
            >
              Kembali
            </button>
            {step === 2 && (
              <button className="bg-white text-black h-10 w-full rounded-md">
                Submit
              </button>
            )}
          </div>
        )}
      </div>
    </DrawQueryProvider>
  );
};

export default DrawQuery;
