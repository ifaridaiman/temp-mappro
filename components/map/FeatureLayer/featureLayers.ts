import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export const baseFeatureLayer = new FeatureLayer({
  url: "https://gdas.jupem.gov.my/gissvr/rest/services/ACD_MappingProposal/Metadata_Info/FeatureServer/3",
  outFields: ["*"],
  // popupTemplate: {
  //   title: "LEMBAR {SHEET_NO}",
  //   overwriteActions: true
  // }
});

export const semenanjungFS = new FeatureLayer({
  url: "https://psdev.esrimy.com/gisserver/rest/services/Hosted/FOTOUDARA_ORTHO_FOOTPRINT/VectorTileServer",
  popupTemplate: {
    title: "LEMBAR {NAM}",
    overwriteActions: true
  }
});

export const mapSheetLayer = new FeatureLayer({
  url: "https://services7.arcgis.com/V7CrZmPvAESPN510/arcgis/rest/services/MY701/FeatureServer/0"
});

export const poiFS = new FeatureLayer({
  url: "https://psdev.esrimy.com/gisserver/rest/services/POI/MapServer",
  popupTemplate: {
    title: "LEMBAR {NAM}",
    overwriteActions: true
  }
});

export const metadata50k = new FeatureLayer({
  url:"https://gdas.jupem.gov.my/gissvr/rest/services/ACD_MappingProposal/Metadata_Info/FeatureServer/0",
  outFields:["*"]
})
export const metadata25k = new FeatureLayer({
  url:"https://gdas.jupem.gov.my/gissvr/rest/services/ACD_MappingProposal/Metadata_Info/FeatureServer/1",
  outFields:["*"]
})
export const metadata10k = new FeatureLayer({
  url:"https://gdas.jupem.gov.my/gissvr/rest/services/ACD_MappingProposal/Metadata_Info/FeatureServer/2",
  outFields:["*"]
})
export const metadata5k = new FeatureLayer({
  url:"https://gdas.jupem.gov.my/gissvr/rest/services/ACD_MappingProposal/Metadata_Info/FeatureServer/3",
  outFields:["*"]
})

export const stateFeatureLayer = new FeatureLayer({
  url:"https://gdas.jupem.gov.my/gissvr/rest/services/ACD_MappingProposal/Demarcation/FeatureServer/0",
  outFields:["*"]
})

export const districtFeatureLayer = new FeatureLayer({
  url:"https://gdas.jupem.gov.my/gissvr/rest/services/ACD_MappingProposal/Demarcation/FeatureServer/1",
  outFields:["*"]
})

export const mukimFeatureLayer = new FeatureLayer({
  url: "https://gdas.jupem.gov.my/gissvr/rest/services/ACD_MappingProposal/Demarcation/FeatureServer/2",
  outFields: ["*"]
})