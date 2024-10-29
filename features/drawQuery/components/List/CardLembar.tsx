import React from "react";
import { MdCloseFullscreen } from "react-icons/md";
import { TfiTrash } from "react-icons/tfi";

type CardLembarProps = {
  status: string;
  lembar: string;
  negeri?: string[];
  daerah?: string[];
};

const CardLembar: React.FC<CardLembarProps> = ({
  status,
  lembar,
  negeri,
  daerah,
}) => {
  return (
    <div className="w-full bg-white rounded">
      <div
        className={`w-full ${status === "draft" && "bg-red-300"} ${
          status === "wip" && "bg-yellow-300"
        } ${status === "ready" && "bg-green-300"} h-2 rounded-t`}
      ></div>
      <div className="flex flex-row items-center p-4 justify-between">
        <div>
          <p className=" font-bold text-black text-base">{lembar}</p>
          <div
            className="flex flex-row w-48 truncate"
            title={negeri?.join(",")}
          >
            <p className="text-xs font-light text-black">{negeri?.join(",")}</p>
          </div>

          <div
            className="flex flex-row w-48 truncate"
            title={daerah?.join(",")}
          >
            <p className="text-xs font-light text-black">{daerah?.join(",")}</p>
          </div>
        </div>
        <div>
          <p className="text-xl">
            <TfiTrash />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardLembar;
