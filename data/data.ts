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
import {
  MdOutlineApps,
  MdLanguage,
  MdLibraryBooks,
  MdSchedule,
} from "react-icons/md";
import { IoMdWifi, IoMdPeople, IoMdLaptop } from "react-icons/io";
import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaTheaterMasks,
  FaUsers,
  FaMicrophoneAlt,
  FaBriefcase,
} from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

export const features = [
  {
    label: "WiFi",
    icon: IoMdWifi,
    description:
      "High-speed wireless internet available throughout the center.",
  },
  {
    label: "1-to-1 Teaching",
    icon: FaChalkboardTeacher,
    description: "Personalized one-on-one sessions with expert tutors.",
  },
  {
    label: "Canteen",
    icon: GiForkKnifeSpoon,
    description:
      "On-site canteen offering a variety of healthy meals and snacks.",
  },
  {
    label: "Language Lab",
    icon: MdLanguage,
    description:
      "State-of-the-art language lab equipped with multimedia tools for interactive learning.",
  },
  {
    label: "Resource Library",
    icon: MdLibraryBooks,
    description:
      "A vast collection of books and digital resources tailored for English learners.",
  },
  {
    label: "Interactive Workshops",
    icon: IoMdPeople,
    description:
      "Hands-on workshops to practice conversation, grammar, and creative writing skills.",
  },
  {
    label: "Exam Preparation",
    icon: FaGraduationCap,
    description:
      "Specialized courses designed to help you excel in exams like IELTS and TOEFL.",
  },
  {
    label: "Cultural Events",
    icon: FaTheaterMasks,
    description:
      "Engaging events that immerse you in English-speaking cultures through drama, music, and art.",
  },
  {
    label: "Online Classes",
    icon: IoMdLaptop,
    description:
      "Flexible virtual classes that let you learn at your own pace from anywhere.",
  },
  {
    label: "Flexible Schedule",
    icon: MdSchedule,
    description:
      "Varied class timings designed to fit your busy lifestyle and diverse learning needs.",
  },
  {
    label: "Student Community",
    icon: FaUsers,
    description:
      "A vibrant community where learners connect, practice, and share experiences.",
  },
  {
    label: "Pronunciation Practice",
    icon: FaMicrophoneAlt,
    description:
      "Dedicated sessions to help improve your accent and ensure clear articulation.",
  },
  {
    label: "Career Counseling",
    icon: FaBriefcase,
    description:
      "Guidance and support to leverage your English skills for academic and professional success.",
  },
];

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
