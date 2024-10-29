'use client'
import React, { useEffect } from "react";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import MapView from "@arcgis/core/views/MapView";

interface ScaleBarWidgetProps {
    view: MapView;
}

const ScaleBarWidget: React.FC<ScaleBarWidgetProps> = ({ view }) => {
    useEffect(() => {
        let scaleBarWidget: ScaleBar | null = null;

        if (view) {
            scaleBarWidget = new ScaleBar({
                view,
                unit: "metric" // or "non-metric" for imperial units
            });
            view.ui.add(scaleBarWidget, "bottom-left");

            console.log('ScaleBarWidget has been mounted.');
        }

        return () => {
            if (view && scaleBarWidget) {
                console.log('Removing ScaleBarWidget from UI.');
                try {
                    view.ui.remove(scaleBarWidget);
                    scaleBarWidget.destroy();
                } catch (error) {
                    console.error('Error removing ScaleBarWidget:', error);
                }
            } else {
                console.log('ScaleBarWidget was not mounted, no need to remove.');
            }
        };
    }, [view]);

    return null;
};

export default ScaleBarWidget;
