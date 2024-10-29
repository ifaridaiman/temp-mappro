import React from "react";
import CardLembar from "./CardLembar";
import { useThemeContext } from "@/context/ThemeContext";

const ListLembar = () => {
  const {lembarDataList} = useThemeContext();
  return (
    <>
      <p className="text-white mt-2 mb-8 text-base font-light">
        Senarai Lembar Dipilih
      </p>
      <div className="flex flex-col gap-4 overflow-y-auto h-96">
        {
          lembarDataList.map((lembarItem, index) => (
            <CardLembar
              key={index}
              status={'draft'}
              lembar={lembarItem.noLembar}
              negeri={lembarItem.state}
              daerah={lembarItem.district}
            />
          ))
        }
      </div>
    </>
  );
};

export default ListLembar;
