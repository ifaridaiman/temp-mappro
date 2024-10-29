"use client";
import TopBar from "@/components/navbar/TopBar";
import LeftSidebar from "@/components/navbar/LeftBar";
import { navData } from "@/contents/nav.contents";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const DrawQuery = dynamic(() => import("@/features/drawQuery"), {ssr:false})


const appName = "Pemodelan Perancangan Pemetaan";

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  
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


  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopBar pageName={appName} />
      <div className="flex flex-grow overflow-hidden">
        <LeftSidebar navData={navData} userName={user} />
        <DrawQuery/>
      </div>
    </div>
  );
}
