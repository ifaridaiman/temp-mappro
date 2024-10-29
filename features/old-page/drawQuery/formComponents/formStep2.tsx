import React from "react";
import { useDrawQuery } from "../hooks/useDrawQuery";
import {
  ArahanTypeEnum,
  JenisArahanEnum,
  PengkelasanEnum,
  SkalaEnum,
} from "../enum/formEnum";
import { useDrawQueryContext } from "../DrawQueryContext";

const FormStep2 = () => {
  const { selectedPengkelasan, setSelectedPengkelasan } = useDrawQuery();
  const { selectedArahan, selectedJenisArahan, setSelectedJenisArahan, selectedSkala, setSelectedSkala } = useDrawQueryContext();
  return (
    <div>
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-white">Pengkelasan</label>
        <select
          className="h-10 rounded text-base p-2"
          value={selectedPengkelasan ?? ""}
          onChange={(e) =>
            setSelectedPengkelasan(e.target.value as PengkelasanEnum)
          }
        >
          <option value="">Pilih Pengkelasan</option>
          <option value={PengkelasanEnum.bandar}>
            {PengkelasanEnum.bandar}
          </option>
          <option value={PengkelasanEnum.pelbagai}>
            {PengkelasanEnum.pelbagai}
          </option>
        </select>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-white">Peratusan Perubahan</label>
        <input type="text" className=" h-10 rounded text-base p-2" />
      </div>
      <div className="flex flex-col gap-2 mb-8">
        <label className="text-white">Jenis Arahan</label>
        <select
          className="h-10 rounded text-base p-2"
          value={selectedJenisArahan ?? ""}
          onChange={(e) =>
            setSelectedJenisArahan(e.target.value as JenisArahanEnum)
          }
        >
          <option value="">Pilih Jenis Arahan</option>
          <option value={JenisArahanEnum.baru}>{JenisArahanEnum.baru}</option>
          <option value={JenisArahanEnum.ulangan}>
            {JenisArahanEnum.ulangan}
          </option>
        </select>
      </div>
      
      
    </div>
  );
};

export default FormStep2;
