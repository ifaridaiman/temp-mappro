import React from "react";
import Image from "next/image";

type Props = {
  pageName: string;
};

const TopBar: React.FC<Props> = ({ pageName }) => {
  return (
    <nav className="fixed z-30 w-full bg-white shadow-md py-2">
      <div className="flex justify-between items-center px-4">
        <div className="text-black font-bold">{pageName}</div>
        <div className="flex gap-4 items-center justify-center">
          <Image
            src={"/assets/logo/Logo_GDAS.png"}
            width={35}
            height={35}
            alt="logo-gdas"
          />
          <Image
            src={"/assets/logo/Logo_Jupem.png"}
            width={35}
            height={35}
            alt="logo-jupem"
          />
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
