"use client";
import React, { useState } from "react";
import { useNavbar } from "@/hooks/navbar/useNavbar";
import UsernameInitial from "./UsernameInitial";
import { useAuth } from "@/hooks/auth/useAuth";


type NavbarProps = {
  navData: Array<{ title: string; action: string; icons: React.ReactNode }>;
  userName?: string;
}


const LeftSidebar: React.FC<NavbarProps> = ({ navData, userName }) => {
  const { handleClick } = useNavbar();
  const { handleSignOut } = useAuth();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  }

  return (
    <aside className="bg-gray-800 text-white w-16 flex flex-col items-center py-4 fixed z-20 h-[92vh] top-[58px] justify-between">
      <div className="flex flex-col items-center">
        <ul className="flex flex-col gap-2">
          {navData.map((item, index) => (
            <li key={index} title={item.title}>
              <div
                onClick={() => handleClick(item.action)}
                className="bg-gray-700 to-transparent p-2 rounded-full hover:bg-gray-900 transition duration-100 cursor-pointer"
              >
                {item.icons}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="relative">
          <div className="" onClick={togglePopup}>
            <UsernameInitial username={userName} />
          </div>
          {isPopupVisible && (
            <div className="absolute bottom-0 left-14 bg-gray-400 p-0.5 text-white rounded shadow-lg z-30" id="popupMenu">
              <button className="py-2 px-3 rounded hover:bg-gray-100 hover:text-black transition duration-100" onClick={handleSignOut}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
