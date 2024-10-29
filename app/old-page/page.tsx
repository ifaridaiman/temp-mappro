"use client";
import TopBar from "@/components/navbar/TopBar";
import LeftSidebar from "@/components/navbar/LeftBar";
import { navData } from "@/contents/nav.contents";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import Switch from "@/components/switch";
import dynamic from "next/dynamic";
import FormContainer from "@/components/formContainer/FormContainer";
import DrawQuery from "@/features/old-page/drawQuery";


const MapContainer = dynamic(() => import("@/components/map/MapContainer"), { ssr: false });

const appName = "Pemodelan Perancangan Pemetaan";

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isStaticListOpen, setIsStaticListOpen] = useState<boolean>(false);

  

  const getCredentials = () => {
    const itemStr = localStorage.getItem("user");
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    return item.userData;
  };


  useEffect(() => {
    const userData = getCredentials();
    if (userData) {
      console.log("User Name:", userData.username);
      console.log(
        "User Groups:",
        userData.groups.map((item: any) => item._title)
      );
      setUser(userData.userName);
    }
    setLoading(false);
  }, [router]);

  const { showRightWidget, widgetContent } = useThemeContext();


  const variants = {
    hidden: { x: "50%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopBar pageName={appName} />
      <div className="flex flex-grow overflow-hidden">
        <LeftSidebar navData={navData} userName={user} />
        <div className="relative flex-grow bg-gray-50 ml-16">
          <MapContainer />
        </div>
      </div>
      {showRightWidget && widgetContent === "imagery_swipe" && (
        <motion.div
          id="right-widget"
          className="w-1/4 h-full bg-[#272F27] p-8 absolute top-0 right-0 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ ease: "easeOut", duration: 0.5 }}
        >
          <p className="text-white font-bold text-base tracking-wide">Jana Arahan Pemetaan</p>
            <div className="mt-4 h-full flex flex-col justify-between">
              <FormContainer>
                <DrawQuery />
              </FormContainer>
            </div>
          <div className="pt-4">
            
          </div>
        </motion.div>
        )} 
    </div>
  );
}
