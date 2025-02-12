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
  GiSofa,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { MdOutlineVilla, MdPublic } from "react-icons/md";
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
  FaSchool,
  FaDesktop,
  FaFutbol,
  FaParking,
  FaComments,
  FaUniversity,
  FaWrench,
  FaTrophy,
  FaPencilAlt,
  FaBookOpen,
} from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

import {
  MdTheaters,
  MdPsychology,
  MdOutlineBusinessCenter,
  MdSecurity,
} from "react-icons/md";
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

export const schoolFacilities = [
  {
    label: "Modern Classrooms",
    icon: FaSchool,
    description:
      "Well-equipped classrooms featuring modern teaching aids and ergonomic seating to create an engaging learning environment.",
  },
  {
    label: "Computer Lab",
    icon: FaDesktop,
    description:
      "High-performance computers and up-to-date software available for research, digital projects, and interactive learning.",
  },
  {
    label: "Auditorium",
    icon: MdTheaters,
    description:
      "A spacious auditorium designed for guest lectures, presentations, and school-wide events.",
  },
  {
    label: "Sports Complex",
    icon: FaFutbol,
    description:
      "Comprehensive sports facilities to promote physical fitness, teamwork, and extracurricular activities.",
  },
  {
    label: "Counseling Center",
    icon: MdPsychology,
    description:
      "A dedicated center providing academic guidance, personal counseling, and mental health support for students.",
  },
  {
    label: "Study Lounge",
    icon: GiSofa,
    description:
      "Comfortable, quiet zones for self-study, group discussions, and collaborative projects outside the classroom.",
  },
  {
    label: "Administrative Office",
    icon: MdOutlineBusinessCenter,
    description:
      "The central hub for administrative support, student services, and essential campus information.",
  },
  {
    label: "Parking Facility",
    icon: FaParking,
    description:
      "Ample parking spaces available for students, faculty, and visitors to ensure a smooth campus experience.",
  },
  {
    label: "Security & Surveillance",
    icon: MdSecurity,
    description:
      "State-of-the-art security systems and 24/7 surveillance to maintain a safe and secure campus environment.",
  },
];

export const courseTypes = [
  {
    label: null,
    icon: AiOutlineGlobal,
    description: "All",
  },
  {
    title: "General English",
    level: "Beginner to Advanced",
    description:
      "A comprehensive course covering all language skills including reading, writing, speaking, and listening.",
    icon: MdPublic,
  },
  {
    title: "IELTS Preparation",
    level: "Intermediate to Advanced",
    description:
      "Focused preparation with practice tests and strategies designed to boost your IELTS score.",
    icon: FaGraduationCap,
  },
  {
    title: "Business English",
    level: "Intermediate to Advanced",
    description:
      "Tailored for professionals, this course covers business vocabulary, presentations, and negotiation skills.",
    icon: FaBriefcase,
  },
  {
    title: "Conversational English",
    level: "Beginner to Intermediate",
    description:
      "Designed to boost your confidence in everyday communication and social interactions.",
    icon: FaComments,
  },
  {
    title: "Academic English",
    level: "Intermediate to Advanced",
    description:
      "Focus on essay writing, critical reading, and research skills to prepare for academic studies.",
    icon: FaUniversity,
  },
  {
    title: "English for Specific Purposes",
    level: "Varies",
    description:
      "Specialized courses addressing needs in fields such as medicine, law, technology, and more.",
    icon: FaWrench,
  },
  {
    title: "Advanced Writing Skills",
    level: "Advanced",
    description:
      "Enhance your writing techniques for academic, professional, or creative writing endeavors.",
    icon: FaPencilAlt,
  },
  {
    title: "Pronunciation and Accent Training",
    level: "All Levels",
    description:
      "Targeted exercises and sessions aimed at improving clarity, accent, and overall pronunciation.",
    icon: FaMicrophoneAlt,
  },
  {
    title: "English Grammar Intensive",
    level: "Beginner to Advanced",
    description:
      "A deep dive into grammar rules through interactive sessions and practical exercises.",
    icon: FaBookOpen,
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
