'use client'
import React, { useEffect } from "react";
import Search from "@arcgis/core/widgets/Search";
import MapView from "@arcgis/core/views/MapView";
import { baseFeatureLayer, semenanjungFS } from "@/components/map/FeatureLayer/featureLayers";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

interface SearchWidgetProps {
  view: MapView;
}

const SearchWidget: React.FC<SearchWidgetProps> = ({ view }) => {
  useEffect(() => {
    // let searchWidget: Search | null = null;

    const sources = [
      {
        layer: baseFeatureLayer,
        searchFields: ["SHEET_NO"],
        displayField: "SHEET_NO",
        exactMatch: false,
        outFields: ["*"],
        name: "Semenanjung",
        placeholder: "example: FN14183",
        maxResults: 6,
        maxSuggestions: 6,
        suggestionEnabled: true,
        minSuggestCharacters: 0,
      }
    ]
    
    
    const searchWidget = new Search({
      view: view,
      includeDefaultSources: false,
      sources: sources
    });

    

    if (view) {
      
      view.ui.add(searchWidget, "top-right");

      console.log('SearchWidget has been mounted.');
    }

    return () => {
      if (searchWidget && view) {
        try {
          console.log('Removing SearchWidget from UI.');
          view.ui.remove(searchWidget);
          searchWidget.destroy();
        } catch (error) {
          console.error('Error removing SearchWidget:', error);
        }
      } else {
        console.log('SearchWidget was not mounted, no need to remove.');
      }
    };
  }, [view]);

  return null; // This component does not render any visible React elements
};

export default SearchWidget;
