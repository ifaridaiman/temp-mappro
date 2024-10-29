import React, { useRef, useEffect, useState } from "react";
import view from "@arcgis/core/views/view";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import Expand from "@arcgis/core/widgets/Expand";
import Graphic from "@arcgis/core/Graphic";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Query from "@arcgis/core/rest/support/Query";
import { useThemeContext } from "@/context/ThemeContext";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { baseFeatureLayer, stateFeatureLayer, districtFeatureLayer, mukimFeatureLayer } from "../../FeatureLayer/featureLayers";
import Polygon from "@arcgis/core/geometry/Polygon"
import selectedLembar from "@/types/form.type";

type DrawWidgetProps = {
  view: MapView;
};



const DrawWidget: React.FC<DrawWidgetProps> = ({ view }) => {
  const drawDiv = useRef<Sketch | null>(null);
  const { graphicLayer, setFieldNoLembar, lembarDataList, setLembarDataList, addLembarData, addState, setFieldState} = useThemeContext();
  
  let kordinatX = "";
  let kordinatY = "";
  let xmin = 0;
  let ymin = 0;
  let xmax = 0;
  let ymax = 0;

  useEffect(() => {
    console.log("Draw WIdget init")
    // if (!drawDiv.current && view) {
      console.log("Draw widget create")
      view.map.allLayers.on("change", (event) => {
        if (event.added.length > 1) {
          view.map.add(graphicLayer);
        }
      });

      drawDiv.current = new Sketch({
        view: view,
        layer: graphicLayer,
        availableCreateTools: ["polygon", "point"],
        creationMode: "update",
      });

      drawDiv.current.on("create", async (event) => {
        if (
          event.state === "complete" &&
          event.graphic.geometry.type === "polygon"
        ) {

          console.log("Remove previous Data");
          if(lembarDataList.length > 0){
            setLembarDataList([]),
            setFieldState([])
          }
          console.log("Polygon Drawn:", event.graphic.geometry.toJSON());

          // Calculate the centroid of the polygon
          const centroid = event.graphic.geometry.extent.center;
          const polygon = event.graphic.geometry as __esri.Polygon;
          const extent = polygon.extent;

          xmin = extent.xmin;
          ymin = extent.ymin;
          xmax = extent.xmax;
          ymax = extent.ymax;

          if (centroid.spatialReference.wkid !== 4326) {
            const centroidWGS84 =
              webMercatorUtils.webMercatorToGeographic(centroid);
            const centroidWGS84Json = centroidWGS84.toJSON();
            console.log("Centroid WGS84:", centroidWGS84.toJSON());
            console.log("Centroid WGS84 X:", centroidWGS84Json.x);
            kordinatX = centroidWGS84Json.x;
            kordinatY = centroidWGS84Json.y;
          }

          
          const baseQuery = baseFeatureLayer.createQuery();
          baseQuery.geometry = polygon;  // Use the drawn polygon for the query
          baseQuery.spatialRelationship = "intersects";  // Find features that intersect with the polygon
          baseQuery.returnGeometry = true;  // We only need the attribute, not the geometry
          baseQuery.outFields = ["NO_LEMBAR"];  // Only query for the SHEET_NO field

          // Execute the query
          const baseQueryResult = await baseFeatureLayer.queryFeatures(baseQuery);

          if (baseQueryResult.features.length > 0) {
            // setFieldNoLembar(baseQueryResult.features.map(f => f.attributes.NO_LEMBAR))
            // lembarsData = baseQueryResult.features.map(f => f.attributes.NO_LEMBAR)

            baseQueryResult.features.forEach(async (feature) => {
              const noLembar = feature.attributes.NO_LEMBAR;
              const polygonLembar = feature.geometry as Polygon
              const rings = polygonLembar.rings;

              console.log("noLembar : ", noLembar)
              console.log("rings: ", rings)

              const queryPolygonLembar = new Polygon({
                rings: rings,
                spatialReference: polygonLembar.spatialReference,  // Ensure the spatial reference is included
              });

              // Initialize the data for this noLembar
              const lembarData: selectedLembar = {
                status:"draft",
                noLembar,
                state: [],
                district: [],
                mukim: [],
              };

              const stateQuery = stateFeatureLayer.createQuery();
              stateQuery.geometry = queryPolygonLembar;
              stateQuery.spatialRelationship = "intersects";
              stateQuery.returnGeometry = false;
              stateQuery.outFields = ["NAM"]

              const stateQueryResult = await stateFeatureLayer.queryFeatures(stateQuery);

              if(stateQueryResult.features.length > 0){
                lembarData.state = stateQueryResult.features.map(f => f.attributes.NAM);
                console.log("State results", stateQueryResult.features.map(f => f.attributes.NAM))
                }else{
                console.log("NO State")
              }

              const districtQuery = districtFeatureLayer.createQuery();
              districtQuery.geometry = queryPolygonLembar;
              districtQuery.spatialRelationship = "intersects";
              districtQuery.returnGeometry = false;
              districtQuery.outFields = ["NAM"]

              const districtQueryResult = await districtFeatureLayer.queryFeatures(districtQuery);

              if(districtQueryResult.features.length > 0){
                lembarData.district = districtQueryResult.features.map(f => f.attributes.NAM);
                console.log("District results", districtQueryResult.features.map(f => f.attributes.NAM))
              }else{
                console.log("NO District")
              }

              const mukimQuery = mukimFeatureLayer.createQuery();
              mukimQuery.geometry = queryPolygonLembar;
              mukimQuery.spatialRelationship = "intersects";
              mukimQuery.returnGeometry = false;
              mukimQuery.outFields = ["NAM"]

              const mukimQueryResult = await mukimFeatureLayer.queryFeatures(mukimQuery);

              if(mukimQueryResult.features.length > 0){
                lembarData.mukim = mukimQueryResult.features.map(f => f.attributes.NAM);
                console.log("Mukim results", mukimQueryResult.features.map(f => f.attributes.NAM))
              }else{
                console.log("NO Mukim")
              }

              // Push this lembar data to the list
              addLembarData(lembarData);

              console.log("Lembar data added:", lembarData);
            })

          } else {
            console.log("No SHEET_NO found for the drawn polygon.");
          }
          
        }
      });

      drawDiv.current.on("delete", async (event) => {
        console.log("delete object")
        setFieldNoLembar([]);
      })
      

      const drawExpand = new Expand({
        expandIcon: "polygon",
        expandTooltip: "LayerList",
        view: view,
        expanded: false,
        content: drawDiv.current,
        group: "expandable-widgets",
      });

      view.ui.add(drawExpand, "top-right");
    // }
  }, [view]);

  return null;
};

export default DrawWidget;
