import { GoHome, GoHomeFill } from "react-icons/go";
import { MdExplore, MdOutlineExplore } from "react-icons/md";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5";
import { PiFilmReelFill, PiFilmReelLight } from "react-icons/pi";
import { RiMessage2Fill, RiMessage2Line } from "react-icons/ri";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

export const NavigationData = [
  {
    id: 1,
    title: "home",
    Icon: GoHome,
    IconActive: GoHomeFill,
    onClick: false,
    to: "/",
    navigate: true,
  },
  {
    id: 2,
    title: "search",
    Icon: IoSearchOutline,
    IconActive: IoSearchSharp,
    onClick: true,
    to: "/search",
    navigate: false,
  },
  {
    id: 3,
    title: "explore",
    Icon: MdOutlineExplore,
    IconActive: MdExplore,
    onClick: false,
    to: "/explore",
    navigate: true,
  },
  {
    id: 4,
    title: "reels",
    Icon: PiFilmReelLight,
    IconActive: PiFilmReelFill,
    onClick: false,
    to: "/reels",
    navigate: true,
  },
  {
    id: 5,
    title: "notifications",
    Icon: IoHeartOutline,
    IconActive: IoHeartSharp,
    onClick: true,
    to: "/notifications",
    navigate: false,
  },
];
