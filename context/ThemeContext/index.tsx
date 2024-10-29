import React, { createContext, useContext, useState, ReactNode } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import {
  ArahanTypeEnum,
  SkalaEnum,
  NoSiriEnum,
  JenisArahanEnum,
  SumbarDataEnum,
  PengkelasanEnum
} from "@/features/drawQuery/enum/formEnum";
import selectedLembar from "@/types/form.type";

type ThemeContextType = {
  showRightWidget: boolean;
  widgetContent: string | null;
  setShowRightWidget: (show: boolean) => void;
  setWidgetContent: (content: string | null) => void;
  mapView: MapView | null;
  setMapView: (view: MapView | null) => void;
  webmap: WebMap | null;
  graphicLayer: GraphicsLayer;
  fieldNoLembar: string[] | [];
  setFieldNoLembar: (fieldNoLembar: string[]) => void;
  fieldState: string[] | [];
  setFieldState: (fieldState: string[]) => void;
  fieldDistrict: string[] | [];
  setFieldDistrict: (fieldDistrict: string[]) => void;
  fieldMukim: string[] | [];
  setFieldMukim: (fieldMukim: string[]) => void;
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  subStep: number;
  setSubStep: (step: number) => void;
  nextSubStep: () => void;
  prevSubStep: () => void;
  selectedArahan: ArahanTypeEnum | null;
  setSelectedArahan: (selectedArahan: ArahanTypeEnum) => void;
  selectedPengkelasan: PengkelasanEnum | null;
  setSelectedPengkelasan: (selectedPengkelasan: PengkelasanEnum) => void;
  selectedNoSiri: NoSiriEnum | null;
  setSelectedNoSiri: (selectedNoSiri: NoSiriEnum) => void;
  selectedJenisArahan: JenisArahanEnum | null;
  setSelectedJenisArahan: (selectedJenisArahan: JenisArahanEnum) => void;
  selectedSkala: SkalaEnum | null;
  setSelectedSkala: (selectedSkala: SkalaEnum) => void;
  selectedSumberData: SumbarDataEnum | null;
  setSelectedSumberData: (selectedSumberData: SumbarDataEnum) => void;

  lembarDataList: selectedLembar[];
  setLembarDataList: (data: selectedLembar[]) => void;
  addLembarData: (newData: selectedLembar) => void;
  addState: (newData: string) => void;
  // Add any other state you want to share across the components
};



const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [showRightWidget, setShowRightWidget] = useState<boolean>(false);
  const [widgetContent, setWidgetContent] = useState<string | null>(null);
  const [mapView, setMapView] = useState<MapView | null>(null);

  const [webmap, setWebMap] = useState<WebMap | null>(null);

  const [step, setStep] = useState(0);
  const [subStep, setSubStep] = useState(0);

  const [fieldNoLembar, setFieldNoLembar] = useState<string[]>([]);
  const [fieldDistrict, setFieldDistrict] = useState<string[]>([]);
  const [fieldState, setFieldState] = useState<string[]>([]);
  const [fieldMukim, setFieldMukim] = useState<string[]>([]);

  const [selectedArahan, setSelectedArahan] = useState<ArahanTypeEnum | null>(
    null
  );
  const [selectedNoSiri, setSelectedNoSiri] = useState<NoSiriEnum | null>(null);
  const [selectedJenisArahan, setSelectedJenisArahan] =
    useState<JenisArahanEnum | null>(null);
  const [selectedSkala, setSelectedSkala] = useState<SkalaEnum | null>(null);
  const [selectedSumberData, setSelectedSumberData] =
    useState<SumbarDataEnum | null>(null);
  const [lembarDataList, setLembarDataList] = useState<selectedLembar[]>([]); // State to hold the data
  const [selectedPengkelasan, setSelectedPengkelasan] = useState<PengkelasanEnum | null>(null);

  const addLembarData = (newData: selectedLembar) => {
    setLembarDataList((prevState) => [...prevState, newData]);
  };
  const addState = (newData: string) => {
    setFieldState((prevState) => [...prevState, newData]);
  };
  const addMukim = (newData: selectedLembar) => {
    setLembarDataList((prevState) => [...prevState, newData]);
  };
  const addDistrict = (newData: selectedLembar) => {
    setLembarDataList((prevState) => [...prevState, newData]);
  };
  // const defaultWebMap = new WebMap({
  //   basemap: "satellite",
  // });

  // setWebMap(defaultWebMap);

  const graphicLayer = new GraphicsLayer({
    title: "Sketch Layer",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const nextSubStep = () => setSubStep(subStep + 1);
  const prevSubStep = () => setSubStep(subStep - 1);

  return (
    <ThemeContext.Provider
      value={{
        step,
        setStep,
        nextStep,
        prevStep,
        showRightWidget,
        widgetContent,
        setWidgetContent,
        setShowRightWidget,
        mapView,
        setMapView,
        webmap,
        graphicLayer,
        fieldNoLembar,
        setFieldNoLembar,
        fieldDistrict,
        setFieldDistrict,
        fieldState,
        setFieldState,
        fieldMukim,
        setFieldMukim,
        selectedArahan,
        setSelectedArahan,
        selectedNoSiri,
        setSelectedNoSiri,
        selectedJenisArahan,
        setSelectedJenisArahan,
        selectedSkala,
        setSelectedSkala,
        lembarDataList,
        setLembarDataList,
        addLembarData,
        subStep,
        setSubStep,
        nextSubStep,
        prevSubStep,
        addState,
        selectedSumberData,
        setSelectedSumberData,
        selectedPengkelasan, 
        setSelectedPengkelasan
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
