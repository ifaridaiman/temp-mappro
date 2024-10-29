import React from "react";
interface SwitchProps {
  value: boolean;
  onClickAction: (value: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ value, onClickAction }) => {
  const handleSwitch = (value: boolean) => {
    if(value) {
      localStorage.setItem('switchValue', 'dynamic');
    }else{
      localStorage.setItem('switchValue', 'static');
    }
    onClickAction(value);
  }
  return (
    <div className="flex items-center justify-left gap-2">
      <span className={`text-white text-sm ${value ? 'text-opacity-50' : 'font-bold'}`}>Katalog Imej</span>
      <div
        className={`relative inline-flex items-center h-6 rounded-full w-14 p-1 cursor-pointer ${value ? "bg-green-100" : "bg-gray-600"
          }`}

        onClick={() => handleSwitch(!value)}

      >
        <span
          className={`transform transition-transform duration-300 ease-in-out ${value ? "translate-x-8" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-gray-800 rounded-full shadow-md`}
        />
      </div>
      <span className={`text-white text-sm ${value ? 'font-bold' : 'text-opacity-50'}`}>Perbandingan Imej</span>
    </div>
  );
};

export default Switch;
