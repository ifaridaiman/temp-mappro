'use client'
import React, { useEffect } from "react";
import LayerList from "@arcgis/core/widgets/LayerList"; // instead of this shouldnt we need to import the LayerList from featureLayer.ts? 
import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";

interface LayerListWidgetProps {
    view: MapView;
}

const LayerListWidget: React.FC<LayerListWidgetProps> = ({ view }) => {
    useEffect(() => {
        let layerListExpand: Expand | null = null;

        if (view) {
            const layerList = new LayerList({ view });
            layerListExpand = new Expand({
                expandIcon: "layers",
                view,
                content: layerList,
            });
            view.ui.add(layerListExpand, "top-left");

            console.log('LayerListWidget has been mounted.');
        }

        return () => {
            if (layerListExpand && view) {
                try {
                    console.log('Removing LayerListWidget from UI.');
                    view.ui.remove(layerListExpand);
                    layerListExpand.destroy();
                } catch (error) {
                    console.error('Error removing LayerListWidget:', error);
                }
            } else {
                console.log('LayerListWidget was not mounted, no need to remove.');
            }
        };
    }, [view]);

    return null; // This component does not render any visible React elements
};

export default LayerListWidget;
