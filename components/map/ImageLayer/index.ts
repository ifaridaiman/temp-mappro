import ImageryLayer from "@arcgis/core/layers/ImageryLayer";

export const imageryLayer = new ImageryLayer({
    url: "https://gdas.jupem.gov.my/imgsvr/rest/services/Imagery/FOTO20142/ImageServer",
    title: "Imagery",
    visible: true,
    maxScale: 1000
});