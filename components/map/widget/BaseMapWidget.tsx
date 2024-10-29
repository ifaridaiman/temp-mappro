import React, { useEffect, useRef } from 'react'
import Basemap from '@arcgis/core/Basemap'
import MapView from '@arcgis/core/views/MapView'
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Expand from "@arcgis/core/widgets/Expand";

type BasemapWidgetProps = {
    view: MapView
}

const BasemapWidget:React.FC<BasemapWidgetProps> = ({view}) => {

    const baseMapDiv  = useRef<BasemapGallery | null>(null)

    useEffect(() => {
        if (!baseMapDiv.current && view) {
            baseMapDiv.current = new BasemapGallery({
                view: view
            })
            const baseMapExpand = new Expand({
                expandIcon: "basemap",
                expandTooltip: "Basemap",
                view: view,
                expanded: false,
                content: baseMapDiv.current,
                group: "expandable-widgets"
            });
            view.ui.add(baseMapExpand, "top-left");
        }
    },[view])
  return null
}

export default BasemapWidget