"use client";
import React, { useEffect } from "react";
import Measurement from "@arcgis/core/widgets/DistanceMeasurement2D";
import MapView from "@arcgis/core/views/MapView";
import Expand from "@arcgis/core/widgets/Expand";

interface MeasurementWidgetProps {
  view: MapView;
}

const MeasurementWidget: React.FC<MeasurementWidgetProps> = ({ view }) => {
  useEffect(() => {
    // let measurement: Measurement | null = null;
    let measurementExpand: Expand | null = null;

    if (view) {
      const measurement = new Measurement({
        view,
        // activeTool: "distance",
        unit: "meters",
      });
      measurementExpand = new Expand({
        expandIcon: "measure-line",
        view,
        content: measurement,
      });
      view.ui.add(measurementExpand, "top-left");

      console.log("MeasurementWidget has been mounted.");
    }

    return () => {
      if (measurementExpand && view) {
        try {
          console.log("Removing MeasurementWidget from UI.");
          view.ui.remove(measurementExpand);
          measurementExpand.destroy();
        } catch (error) {
          console.error("Error removing MeasurementWidget:", error);
        }
      } else {
        console.log("MeasurementWidget was not mounted, no need to remove.");
      }
    };
  }, [view]);

  return null;
};

export default MeasurementWidget;
