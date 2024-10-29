"use client";
import React, { useEffect, useRef, useState } from "react";
import esriConfig from "@arcgis/core/config";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import { authMiddleware } from "@/middleware/auth.middleware";
import ScaleBarWidget from "@/components/map/widget/ScaleBarWidget";
import { useThemeContext } from "@/context/ThemeContext";
import { baseFeatureLayer, metadata50k, metadata25k, metadata10k, metadata5k, stateFeatureLayer, districtFeatureLayer } from "@/components/map/FeatureLayer/featureLayers";
import dynamic from "next/dynamic";
import DrawWidget from "./widget/DrawWidget";

const HomeWidget = dynamic(() => import("@/components/map/widget/HomeWidget"), { ssr: false });
const LayerListWidget = dynamic(() => import("@/components/map/widget/LayerListWidget"), { ssr: false });
const MeasurementWidget = dynamic(() => import("@/components/map/widget/MeasurementWidget"), { ssr: false });
const SearchWidget = dynamic(() => import("@/components/map/widget/SearchWidget"), { ssr: false });

esriConfig.portalUrl = "https://gdas.jupem.gov.my/portal";

const MapContainer: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  // const [view, setView] = useState<MapView | null>(null);
  const { mapView, setMapView, graphicLayer } = useThemeContext();

  const initMap = async () => {
    const userInfo = await authMiddleware();
  };

  

  useEffect(() => {
    if(typeof window !== "undefined"){
      const webmap = new WebMap({
        basemap: "satellite",
      });


      webmap?.add(baseFeatureLayer)
      webmap?.add(stateFeatureLayer)
      webmap?.add(districtFeatureLayer)
      // webmap?.add(metadata50k)
      // webmap?.add(metadata25k)
      // webmap?.add(metadata10k)
      // webmap?.add(metadata5k)

      // const stateGeoJsonUrl ="/geojson/state.json";

      // const stateGeoJson = new GeoJsonLayer({
      //   url:stateGeoJsonUrl,
      //   title:"Negeri GeoJSON"
      // })

      // webmap.add(stateGeoJson);
    
      const view = new MapView({
        map: webmap,
        container: mapDiv.current as HTMLDivElement,
        center: [101.6869, 3.139],
        zoom: 10,
      });
    
      view.when(() =>{
        setMapView(view);
        
      });

      
      initMap();
    }
  }, []);

  return (
    <div
      style={{
        height: "83vh",
        width: "100%",
        // marginTop: "58px",
        // marginLeft: "-5px",
      }}
    >
      <div ref={mapDiv} style={{ height: "100%" }}></div>
      {mapView && (
        <>
          <HomeWidget view={mapView} />
          <SearchWidget view={mapView} />
          <LayerListWidget view={mapView} />
          <MeasurementWidget view={mapView} />
          <ScaleBarWidget view={mapView} />
          <DrawWidget view={mapView} />
          
        </>
      )}
    </div>
  );
};

export default MapContainer;
