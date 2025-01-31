import { FaSkiing } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { MdOutlineVilla } from "react-icons/md";
export const categories = [
  {
    label: null,
    icon: AiOutlineGlobal,
    description: "All",
  },
  {
    label: "Beach",
    icon: TbBeach,
    description: "This is a beach city.",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This is a beach city.",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This is a modern city.",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This is in the countryside.",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This is near the pool.",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This is on an Island.",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This is close to a lake.",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This is near to skiing activities.",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This is near to castle.",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This has camping activities.",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This is luxurious.",
  },
];

export const courseLevels = [
  { label: "Beginner", description: "For new learners", icon: null },
  { label: "Elementary", description: "Basic understanding", icon: null },
  { label: "Intermediate", description: "Conversational skills", icon: null },
  {
    label: "Upper Intermediate",
    description: "Fluent communication",
    icon: null,
  },
  { label: "Advanced", description: "Near-native fluency", icon: null },
  {
    label: "Proficient",
    description: "Academic/professional level",
    icon: null,
  },
];

export const ageGroups = [
  { label: "Kids (5-10)", description: "For young learners", icon: null },
  { label: "Teens (11-17)", description: "For teenage learners", icon: null },
  { label: "Adults (18+)", description: "For adult learners", icon: null },
  { label: "Seniors (50+)", description: "For senior learners", icon: null },
];
