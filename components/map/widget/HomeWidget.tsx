'use client'
import React, { useEffect } from "react";
import Home from "@arcgis/core/widgets/Home";
import MapView from "@arcgis/core/views/MapView";

interface HomeWidgetProps {
    view: MapView;
}

const HomeWidget: React.FC<HomeWidgetProps> = ({ view }) => {
    useEffect(() => {
        let homeWidget: Home | null = null;

        if (view) {
            homeWidget = new Home({
                view,
            });
            view.ui.add(homeWidget, "top-left");

            console.log('HomeWidget has been mounted.');
        }

        return () => {
            if (view && homeWidget) {
                console.log('Removing HomeWidget from UI.');
                try {
                    view.ui.remove(homeWidget);
                    homeWidget.destroy();
                } catch (error) {
                    console.error('Error removing HomeWidget:', error);
                }
            } else {
                console.log('HomeWidget was not mounted, no need to remove.');
            }
        };
    }, [view]);

    return null;
};

export default HomeWidget;



