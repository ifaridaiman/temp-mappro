import React, { useState } from "react";
import { useDrawQuery } from "../../hooks/useDrawQuery";
import {
  ArahanTypeEnum,
  JenisArahanEnum,
  NoSiriEnum,
  PengkelasanEnum,
  SkalaEnum,
} from "../../enum/formEnum";
import { useDrawQueryContext } from "../../DrawQueryContext";
import { useThemeContext } from "@/context/ThemeContext";

const FormStep2 = () => {
  const { selectedPengkelasan, setSelectedPengkelasan } = useDrawQuery();
  const {
    selectedArahan,
    setSelectedArahan,
    selectedNoSiri,
    setSelectedNoSiri,
    nextStep,
    lembarDataList,
  } = useThemeContext();

  // State to handle the user input
  const [userInput, setUserInput] = useState("");

  // Function to handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only update the part after the prefix (userInput)
    setUserInput(e.target.value.replace(selectedArahan + " - ", ""));
  };
  return (
    <>
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-black text-sm">Jenis Arahan</label>
        <select
          className="h-10 rounded text-base p-2 pr-5"
          value={selectedArahan ?? ""}
          onChange={(e) => setSelectedArahan(e.target.value as ArahanTypeEnum)}
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
        <label className="text-black text-sm">Tajuk Laporan</label>
        <input
          type="text"
          className=" h-10 rounded text-base p-2 border border-gray-300"
          value={`${selectedArahan ? selectedArahan + " - " : ""}${userInput}`}
          onChange={handleInputChange}
          // Disable cursor movement to the prefix by placing it at the start
          onClick={(e) => {
            e.currentTarget.setSelectionRange(
              selectedArahan ? selectedArahan.length + 3 : 0,
              e.currentTarget.value.length
            );
          }}
        />
      </div>
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-black text-sm">Jenis No. Siri</label>
        <select
          className="h-10 rounded text-base p-2 pr-5"
          value={selectedNoSiri ?? ""}
          onChange={(e) => setSelectedNoSiri(e.target.value as NoSiriEnum)}
        >
          <option value="">Pilih Jenis No. Siri Peta</option>
          <option value={NoSiriEnum.MY701_5K}>{NoSiriEnum.MY701_5K}</option>
          <option value={NoSiriEnum.MY701_10K}>{NoSiriEnum.MY701_10K}</option>
          <option value={NoSiriEnum.MY601}>{NoSiriEnum.MY601}</option>
          <option value={NoSiriEnum.MY501}>{NoSiriEnum.MY501}</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-black text-sm">Senarai Negeri Terlibat</label>
        <input
          type="text"
          className=" h-10 rounded text-base p-2 border border-gray-300"
          value={Array.from(
            new Set(lembarDataList.flatMap((data) => data.state))
          ).join(", ")}
        />
      </div>
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-black text-sm">Senarai Daerah Terlibat</label>
        <input
          type="text"
          className=" h-10 rounded text-base p-2 border border-gray-300"
          value={Array.from(
            new Set(lembarDataList.flatMap((data) => data.district))
          ).join(", ")}
        />
      </div>
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-black text-sm">Senarai Mukim Terlibat</label>
        <input
          type="text"
          className=" h-10 rounded text-base p-2 border border-gray-300"
          value={Array.from(
            new Set(lembarDataList.flatMap((data) => data.mukim))
          ).join(", ")}
        />
      </div>
      <div className="flex justify-end mb-3">
        <button onClick={nextStep} className="p-2 bg-blue-400 rounded">
          Simpan dan Seterusnya
        </button>
      </div>
    </>
  );
};

export default FormStep2;
