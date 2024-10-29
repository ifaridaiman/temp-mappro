'use client'
import React, {useState, useEffect} from 'react'
import { useDrawQuery } from '../hooks/useDrawQuery'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { useMapGraphic } from '../hooks/useMapGraphic';
import { useThemeContext } from '@/context/ThemeContext';
import { ArahanTypeEnum, NoSiriEnum } from '../enum/formEnum';
import { useDrawQueryContext } from '../DrawQueryContext';

const FormStep1 = () => {
    const {noLembar, handleNoLembar, district, handleDistrict, state, handleState, mukim, handleMukim,  } = useDrawQuery();
    const {selectedArahan, setSelectedArahan, selectedNoSiri, setSelectedNoSiri} = useDrawQueryContext();
    const [graphicsLayer] = useState(new GraphicsLayer());
    const {createHighlightGraphic, stateCollection} = useMapGraphic();
    const {mapView} = useThemeContext();

    // Add graphicsLayer to the map when mapView is ready
  useEffect(() => {
    if (mapView && !mapView.map.findLayerById(graphicsLayer.id)) {
      mapView.map.add(graphicsLayer);
    }
  }, [mapView, graphicsLayer]);

  
    // Handler to zoom to the selected state's geometry
    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStateName = event.target.value;
        handleState(event as any); // Continue with the existing handler

        // Find the selected state's geometry from stateCollection
        const selectedState = stateCollection.find(
        (negeri) => negeri.attributes.NAM === selectedStateName
        );

        if (selectedState && selectedState.geometry) {
        const stateExtent = selectedState.geometry.extent;

        
            // Clear any existing graphics in the GraphicsLayer
            graphicsLayer.removeAll();
        
        // Create and add the highlight graphic
        const highlightGraphic = createHighlightGraphic(selectedState.geometry);
        graphicsLayer.add(highlightGraphic);

        // Use view.goTo to zoom into the selected state's extent
        mapView?.goTo({
            target: stateExtent,
            zoom: 8, // Adjust zoom level as needed
        });
        }
    };
  return (
    <div>
            <div className="flex flex-col gap-2 mb-3">
              <label className="text-white text-sm">No. Lembar</label>
              <input
                type="text"
                className=" h-10 rounded text-base p-2"
                value={noLembar.join(",")}
                onChange={handleNoLembar}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label className="text-white text-sm">Daerah</label>
              <input
                type="text"
                className=" h-10 rounded text-base p-2"
                value={district.join(",")}
                onChange={handleDistrict}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label className="text-white text-sm">Negeri</label>
              {state.length > 0 ? (
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2"
                  value={state.join(",")}
                  onChange={handleState}
                />
              ) : (
                <select
                  className="h-10 rounded text-base p-2"
                  value={state.join(",")}
                  onChange={handleStateChange} // Updated to use handleStateChange
                >
                  <option value="">Pilih Negeri</option>
                  {stateCollection.map((negeri, index) => (
                    <option key={index} value={negeri.attributes.NAM}>
                      {negeri.attributes.NAM}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label className="text-white text-sm">Mukim</label>
              <input
                type="text"
                className=" h-10 rounded text-base p-2"
                value={mukim.join(",")}
                onChange={handleMukim}
              />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label className="text-white text-sm">Tajuk</label>
              <input type="text" className=" h-10 rounded text-base p-2" />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label className="text-white text-sm">Pengkelasan</label>
              <input type="text" className=" h-10 rounded text-base p-2" />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label className="text-white text-sm">Peratusan Perubahan</label>
              <input type="text" className=" h-10 rounded text-base p-2" />
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <label className="text-white text-sm">Jenis Arahan</label>
              <select
                className="h-10 rounded text-base p-2"
                value={selectedArahan ?? ""}
                onChange={(e) =>
                  setSelectedArahan(e.target.value as ArahanTypeEnum)
                }
              >
                <option value="">Pilih Jenis Arahan</option>
                <option value={ArahanTypeEnum.PenyediaanGeodata}>
                  {ArahanTypeEnum.PenyediaanGeodata}
                </option>
                <option value={ArahanTypeEnum.PenerbitanPeta}>
                  {ArahanTypeEnum.PenerbitanPeta}
                </option>
                <option value={ArahanTypeEnum.Cetak}>{ArahanTypeEnum.Cetak}</option>
                <option value={ArahanTypeEnum.PengemaskinianPangkalan}>
                  {ArahanTypeEnum.PengemaskinianPangkalan}
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2 mb-3">
                <label className="text-white text-sm">No. Siri</label>
                <select
                    className="h-10 rounded text-base p-2"
                    value={selectedNoSiri ?? ""}
                    onChange={(e) =>
                    setSelectedNoSiri(e.target.value as NoSiriEnum)
                    }
                >
                    <option value="">Pilih No Siri Peta</option>
                    <option value={NoSiriEnum.MY701_5K}>
                        {NoSiriEnum.MY701_5K}
                    </option>
                    <option value={NoSiriEnum.MY701_10K}>
                        {NoSiriEnum.MY701_10K}
                    </option>
                    <option value={NoSiriEnum.MY601}>
                        {NoSiriEnum.MY601}
                    </option>
                    <option value={NoSiriEnum.MY501}>
                        {NoSiriEnum.MY501}
                    </option>
                </select>
            </div>
          </div>
  )
}

export default FormStep1