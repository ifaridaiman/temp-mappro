"use client";
import { useThemeContext } from "@/context/ThemeContext";
import React, { useState, useEffect } from "react";
import { stateFeatureLayer } from "@/components/map/FeatureLayer/featureLayers";

import { useMapGraphic } from "./hooks/useMapGraphic";
import FormStep1 from "./components/form/formStep1";
import FormStep2 from "./components/form/formStep2";
import FormStep3 from "./components/form/formStep3";
import FormStep4 from "./components/form/formStep4";
import { DrawQueryProvider, useDrawQueryContext } from "./DrawQueryContext";

import MapContainer from "@/components/map/MapContainer";
import FilterMap from "./components/Filter/FilterMap";
import ListLembar from "./components/List/ListLembar";




const DrawQuery = () => {

  const {step, setStep, subStep} = useThemeContext();
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
      <div className="relative flex-grow bg-gray-50 ml-16">
      <div className="w-full h-16 bg-green-50 mt-14 flex justify-between items-center px-8">
        <div className="flex flex-row gap-4">
          <div onClick={() => setStep(0)}><span className={`rounded-full py-2 px-4 font-bold ${step === 0 ? "bg-gray-400" : "bg-gray-300"}`}>1</span> Lukis AOI</div>
          <div onClick={() => setStep(1)}><span className={`rounded-full py-2 px-4 font-bold ${step === 1 ? "bg-gray-400" : "bg-gray-300"}`}>2</span> Isi Maklumat Arahan</div>
          <div onClick={() => setStep(2)}><span className={`rounded-full py-2 px-4 font-bold ${step === 2 ? "bg-gray-400" : "bg-gray-300"}`}>3</span> Isi Data</div>
          <div onClick={() => setStep(3)}><span className={`rounded-full py-2 px-4 font-bold ${step === 3 ? "bg-gray-400" : "bg-gray-300"}`}>4</span> Nota Laporan</div>
        </div>
        <div>
          <button className="rounded bg-gray-400 p-2 text-gray-50">
            Jana Arahan Pemetaan
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        {/* Left Component for Map and Forms */}
        <div className="w-4/5">
          {step < 1 ? (
            <MapContainer />
          ) : step === 1 ? (
            <div className="flex items-top justify-center mt-8">
              <div className="border border-gray-100 bg-white p-4 w-4/5">
                <FormStep2 />
                
              </div>
            </div>
          ) : step === 2 ? (
            <div className="flex items-top justify-center mt-8">
              <div className="border border-gray-100 bg-white p-4 w-4/5">
                
                <FormStep3/>  
                
                
              </div>
            </div>
          ) : step === 3 && (
            <div className="flex items-top justify-center mt-8">
              <div className="border border-gray-100 bg-white p-4 w-4/5">
                
                <FormStep4/>  
                
                
              </div>
            </div>
          )
        
        }
        </div>
        
        {/* Right Components form Filtering and Listing */}
        <div className="bg-[#272F27]  w-1/5 h-[90vh] p-4">
          {step === 0 && (
            <>
              <FilterMap/>
            </>
          )}
          {(step === 1 || step === 2) && <ListLembar />}

        </div>
      </div>
    </div>
    </DrawQueryProvider>
  );
};

export default DrawQuery;
