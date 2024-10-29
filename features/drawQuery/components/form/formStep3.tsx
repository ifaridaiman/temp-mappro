import { useThemeContext } from "@/context/ThemeContext";
import React, { useState } from "react";
import {
  ArahanTypeEnum,
  SkalaEnum,
  SumbarDataEnum,
  PengkelasanEnum,
  JenisArahanEnum,
} from "../../enum/formEnum";

const formStep3 = () => {
  const {
    selectedArahan,
    selectedSkala,
    setSelectedSkala,
    selectedSumberData,
    setSelectedSumberData,
    lembarDataList,
    selectedPengkelasan,
    setSelectedPengkelasan,
    selectedJenisArahan,
    setSelectedJenisArahan
  } = useThemeContext();
  const [currentStep, setCurrentStep] = useState(0);
  // Handle stepper navigation
  const handleNext = () => {
    if (currentStep < lembarDataList.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      
      {lembarDataList[currentStep] && (
        <div key={currentStep} className="mb-8 overflow-y-auto h-[24rem]">
          <h3 className="text-lg font-semibold">
            Lembar: {lembarDataList[currentStep].noLembar}
          </h3>
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-black">Pengkelasan</label>
            <select
              className="h-10 rounded text-base p-2 border border-gray-300"
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
            <label className="text-black">Peratusan Perubahan</label>
            <input type="text" className=" h-10 rounded text-base p-2 border border-gray-300" />
          </div>

          {selectedArahan === ArahanTypeEnum.PenyediaanGeodata && (
            <>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Tarikh Arahan Pemetaan</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Skala</label>
                <select
                  className="h-10 rounded text-base p-2 border border-gray-300"
                  value={selectedSkala ?? ""}
                  onChange={(e) =>
                    setSelectedSkala(e.target.value as SkalaEnum)
                  }
                >
                  <option value="">Pilih Skala</option>
                  <option value={SkalaEnum._5k}>{SkalaEnum._5k}</option>
                  <option value={SkalaEnum._10k}>{SkalaEnum._10k}</option>
                  <option value={SkalaEnum._25k}>{SkalaEnum._25k}</option>
                  <option value={SkalaEnum._50k}>{SkalaEnum._50k}</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">No. Kerja</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Kawasan</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Jenis Arahan</label>
                <select
                  className="h-10 rounded text-base p-2 border border-gray-300"
                  value={selectedJenisArahan ?? ""}
                  onChange={(e) =>
                    setSelectedJenisArahan(e.target.value as JenisArahanEnum)
                  }
                >
                  <option value="">Pilih Jenis Arahan</option>
                  <option value={JenisArahanEnum.baru}>{JenisArahanEnum.baru}</option>
                  <option value={JenisArahanEnum.ulangan}>{JenisArahanEnum.ulangan}</option>
                  
                </select>
              </div>
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-black">No. Laporan ACD</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
            </>
          )}

          {selectedArahan === ArahanTypeEnum.PenerbitanPeta && (
            <>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Nama Lembar (Cadangan)</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Edisi</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">No. Kerja Terhad</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-black">No. Kerja Tidak Terhad</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Jenis Arahan</label>
                <select
                  className="h-10 rounded text-base p-2 border border-gray-300"
                  value={selectedJenisArahan ?? ""}
                  onChange={(e) =>
                    setSelectedJenisArahan(e.target.value as JenisArahanEnum)
                  }
                >
                  <option value="">Pilih Jenis Arahan</option>
                  <option value={JenisArahanEnum.baru}>{JenisArahanEnum.baru}</option>
                  <option value={JenisArahanEnum.ulangan}>{JenisArahanEnum.ulangan}</option>
                  
                </select>
              </div>
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-black">Tahun Kerja Luar</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-black">
                  Sumber Data (Fotoudara/Imej Satelit/Topo DB)
                </label>
                <select
                  className="h-10 rounded text-base p-2 border border-gray-300"
                  value={selectedSumberData ?? ""}
                  onChange={(e) =>
                    setSelectedSumberData(e.target.value as SumbarDataEnum)
                  }
                >
                  <option value="">Pilih Skala</option>
                  <option value={SumbarDataEnum.fotoudara}>
                    {SumbarDataEnum.fotoudara}
                  </option>
                  <option value={SumbarDataEnum.imejsatelit}>
                    {SumbarDataEnum.imejsatelit}
                  </option>
                  <option value={SumbarDataEnum.topodb}>
                    {SumbarDataEnum.topodb}
                  </option>
                </select>
              </div>
            </>
          )}

          {selectedArahan === ArahanTypeEnum.Cetak && (
            <>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">No. Kerja</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Nama Lembar</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Edisi</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Tahun Terbit</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Jenis Arahan</label>
                <select
                  className="h-10 rounded text-base p-2 border border-gray-300"
                  value={selectedJenisArahan ?? ""}
                  onChange={(e) =>
                    setSelectedJenisArahan(e.target.value as JenisArahanEnum)
                  }
                >
                  <option value="">Pilih Jenis Arahan</option>
                  <option value={JenisArahanEnum.baru}>{JenisArahanEnum.baru}</option>
                  <option value={JenisArahanEnum.ulangan}>{JenisArahanEnum.ulangan}</option>
                  
                </select>
              </div>
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-black">Jumlah Cetakan</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
            </>
          )}

          {selectedArahan === ArahanTypeEnum.PengemaskinianPangkalan && (
            <>
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-black">Tahun Kerja Luar</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Nama Lembar (Cadangan)</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Edisi</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">No. Kerja Terhad</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">No.Kerja Tidak Terhad</label>
                <input
                  type="text"
                  className=" h-10 rounded text-base p-2 border border-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label className="text-black">Jenis Arahan</label>
                <select
                  className="h-10 rounded text-base p-2 border border-gray-300"
                  value={selectedJenisArahan ?? ""}
                  onChange={(e) =>
                    setSelectedJenisArahan(e.target.value as JenisArahanEnum)
                  }
                >
                  <option value="">Pilih Jenis Arahan</option>
                  <option value={JenisArahanEnum.baru}>{JenisArahanEnum.baru}</option>
                  <option value={JenisArahanEnum.ulangan}>{JenisArahanEnum.ulangan}</option>
                  
                </select>
              </div>
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-black">
                  Sumber Data (Fotoudara/Imej Satelit/ Topo DB)
                </label>
                <select
                  className="h-10 rounded text-base p-2 border border-gray-300"
                  value={selectedSumberData ?? ""}
                  onChange={(e) =>
                    setSelectedSumberData(e.target.value as SumbarDataEnum)
                  }
                >
                  <option value="">Pilih Skala</option>
                  <option value={SumbarDataEnum.fotoudara}>
                    {SumbarDataEnum.fotoudara}
                  </option>
                  <option value={SumbarDataEnum.imejsatelit}>
                    {SumbarDataEnum.imejsatelit}
                  </option>
                  <option value={SumbarDataEnum.topodb}>
                    {SumbarDataEnum.topodb}
                  </option>
                </select>
              </div>
            </>
          )}
        </div>
      )}
      <div className="flex justify-between mb-4 overflow-y-auto">
        <button
          className="p-2 bg-gray-200 rounded"
          onClick={handlePrevious}
          disabled={currentStep === 0} // Disable if on first step
        >
          Previous
        </button>
        <span className="text-lg">
          Lembar {currentStep + 1} of {lembarDataList.length}
        </span>
        <button
          className="p-2 bg-gray-200 rounded"
          onClick={handleNext}
          disabled={currentStep === lembarDataList.length - 1} // Disable if on last step
        >
          Next
        </button>
      </div>
    </>
  );
};

export default formStep3;
