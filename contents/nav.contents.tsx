import HomeGdasIconStyled from "@/components/icons/Home";
import SwiperGdasIconStyled from "@/components/icons/Swiper";
import TutorialGdasIconStyled from "@/components/icons/Tutorial";
import InfoIconStyled from "@/components/icons/InfoIcon";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import DashboardGdasIconStyled from "@/components/icons/Dashboard";

export const navData = [
  {
    id: 1,
    title: "Home",
    url: "/menus",
    icons: <HomeGdasIconStyled fill="#fff" />,
    action: "home",
  },
  {
    id: 2,
    title: "Swipe",
    icons: <SwiperGdasIconStyled fill="#fff" />,
    action: "imagery_swipe",
  },
  {
    id: 3,
    title: "Tutorial",
    url: "/imagery/tutorial",
    icons: <DashboardGdasIconStyled fill="#fff"  />,
    action: "home",
  },
  {
    id: 4,
    title: "Tutorial",
    url: "/imagery/tutorial",
    icons: <InfoIconStyled fill="#fff" />,
    action: "home",
  },
  {
    id: 5,
    title: "Tutorial",
    url: "/imagery/tutorial",
    icons: <TutorialGdasIconStyled fill="#fff" />,
    action: "home",
  },
];
