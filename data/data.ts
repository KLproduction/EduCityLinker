import { FaSkiing } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiSofa,
  GiFamilyHouse,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdPublic } from "react-icons/md";
import { MdLanguage, MdLibraryBooks, MdSchedule } from "react-icons/md";
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
  FaSun,
  FaBolt,
  FaPlus,
} from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";

import {
  MdTheaters,
  MdPsychology,
  MdOutlineBusinessCenter,
  MdSecurity,
} from "react-icons/md";

export const AIMO_DISCOUNT = 0.9;
export const DEPOSIT_RATE = 0.05;

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
    title: "General English",
    description:
      "A comprehensive course covering all language skills, from grammar and vocabulary to reading, writing, listening, and speaking.",
    icon: MdPublic,
  },
  {
    title: "Business English",
    description:
      "Designed for professionals, this course focuses on business communication, negotiations, presentations, and corporate vocabulary.",
    icon: FaBriefcase,
  },
  {
    title: "IELTS Preparation",
    description:
      "Targeted exam preparation courses that boost performance in IELTS assessments with practice tests and proven strategies.",
    icon: FaGraduationCap,
  },
  {
    title: "Summer Schools",
    description:
      "Engaging summer programs offering intensive language practice, cultural activities, and immersive learning experiences.",
    icon: FaSun,
  },
  {
    title: "Intensive Courses",
    description:
      "Accelerated courses designed to deliver in-depth language training in a condensed time frame for rapid improvement.",
    icon: FaBolt,
  },
  {
    title: "One-to-One Lessons",
    description:
      "Personalized tutoring sessions tailored to individual learning needs for focused improvement and progress.",
    icon: FaChalkboardTeacher,
  },
  {
    title: "English Plus",
    description:
      "An enhanced curriculum that goes beyond the basics, incorporating extra skills and practical applications.",
    icon: FaPlus,
  },
  {
    title: "Family Courses",
    description:
      "Family-friendly courses designed for groups, fostering a collaborative and supportive learning environment for all ages.",
    icon: GiFamilyHouse,
  },
];

export const courseLevels = [
  { label: "Beginner (A1)", description: "Entry-level learners", icon: null },
  {
    label: "Elementary (A2)",
    description: "Basic language skills",
    icon: null,
  },
  {
    label: "Intermediate (B1)",
    description: "Developing conversational abilities",
    icon: null,
  },
  {
    label: "Upper Intermediate (B2)",
    description: "Advanced communication skills",
    icon: null,
  },
  { label: "Advanced (C1)", description: "High-level proficiency", icon: null },
  { label: "Proficiency (C2)", description: "Near-native fluency", icon: null },
];

export const ageGroups = [
  { label: "Kids (5-10)", description: "For young learners", icon: null },
  { label: "Teens (11-17)", description: "For teenage learners", icon: null },
  { label: "Adults (18+)", description: "For adult learners", icon: null },
  { label: "Seniors (50+)", description: "For senior learners", icon: null },
];

export const accommodationTypes = [
  {
    label: "Home Stay",
    description: "Experience living with a local host family.",
  },
  {
    label: "Student Residence",
    description: "On-campus or dedicated student residence accommodations.",
  },
  {
    label: "Private Apartment",
    description: "Rent a private apartment for greater independence.",
  },
  {
    label: "No Accommodation",
    description: "No accommodation provided.",
  },
];

export const studentAccommodationDetails = {
  roomTypes: [
    { label: "Single", description: "Individual room for privacy" },
    { label: "Shared", description: "Shared room with one or more roommates" },
  ],
  amenities: [
    { label: "WiFi", description: "High-speed internet available" },
    { label: "Laundry", description: "On-site laundry facilities" },
    { label: "Meals", description: "Meal plans or cafeteria services offered" },
    { label: "Study Space", description: "Study rooms or workspace available" },
    { label: "Garden", description: "Garden or outdoor space" },
    { label: "Dining", description: "Dining options available" },
  ],
};

export const homeStayPreferences = [
  {
    label: "Half-Board",
    description: "Includes breakfast and dinner with your host family.",
  },
  {
    label: "Full-Board",
    description: "Includes all meals (breakfast, lunch, and dinner).",
  },
  {
    label: "Self-Catering",
    description: "Prepare your own meals with kitchen access.",
  },
  {
    label: "Vegetarian Meals",
    description: "Vegetarian meal options available.",
  },
  {
    label: "Vegan Meals",
    description: "100% plant-based meal options provided.",
  },
  {
    label: "Gluten-Free Meals",
    description: "Meals tailored for gluten-free diets.",
  },
  {
    label: "Halal Meals",
    description: "Meals prepared according to Halal dietary guidelines.",
  },
  {
    label: "Kosher Meals",
    description: "Meals prepared following Kosher dietary laws.",
  },
  {
    label: "Pet-Free Home",
    description: "Stay in a home without pets.",
  },
  {
    label: "Pet-Friendly Home",
    description: "Stay in a home with pets, for those who love animals.",
  },
  {
    label: "Host Family with Children",
    description: "Live with a host family that has children.",
  },
  {
    label: "Host Family without Children",
    description: "Stay with a host family without children.",
  },
  {
    label: "Non-Smoking Home",
    description: "Stay in a household where smoking is not allowed.",
  },
  {
    label: "Smoking Allowed Home",
    description: "Stay in a home where smoking is permitted.",
  },
  {
    label: "Private Bathroom",
    description: "Ensuite or dedicated private bathroom access.",
  },
  {
    label: "Wheelchair Accessible",
    description: "Home with accessibility features for mobility needs.",
  },
  {
    label: "Quiet Home",
    description: "Stay in a peaceful, quiet environment.",
  },
  {
    label: "Social & Interactive Home",
    description: "Stay with a sociable host family that engages with students.",
  },
];

export const airportTransfers = [
  {
    label: "Arrival & Departure",
    description: "Round-trip airport transfers upon arrival and departure.",
  },
  {
    label: "Arrival Only",
    description: "One-way airport transfer upon arrival.",
  },
  {
    label: "Departure Only",
    description: "One-way airport transfer upon departure.",
  },
];

export const ukCities: string[] = [
  // England
  "Bath",
  "Birmingham",
  "Bradford",
  "Brighton & Hove",
  "Bristol",
  "Cambridge",
  "Canterbury",
  "Carlisle",
  "Chelmsford",
  "Chester",
  "Chichester",
  "Coventry",
  "Derby",
  "Doncaster",
  "Durham",
  "Ely",
  "Exeter",
  "Gloucester",
  "Hereford",
  "Kingston upon Hull",
  "Lancaster",
  "Leeds",
  "Leicester",
  "Lichfield",
  "Lincoln",
  "Liverpool",
  "London",
  "Manchester",
  "Milton Keynes",
  "Newcastle upon Tyne",
  "Norwich",
  "Nottingham",
  "Oxford",
  "Peterborough",
  "Plymouth",
  "Portsmouth",
  "Preston",
  "Ripon",
  "Salford",
  "Salisbury",
  "Sheffield",
  "Southampton",
  "Southend-on-Sea",
  "St Albans",
  "Stoke-on-Trent",
  "Sunderland",
  "Truro",
  "Wakefield",
  "Wells",
  "Westminster",
  "Winchester",
  "Wolverhampton",
  "Worcester",
  "York",
  "Wrexham",

  // Scotland
  "Aberdeen",
  "Dundee",
  "Dunfermline",
  "Edinburgh",
  "Glasgow",
  "Inverness",
  "Perth",

  // Wales
  "Bangor",
  "Cardiff",
  "Newport",
  "St Asaph",
  "St Davids",
  "Swansea",
  "Wrexham",

  // Northern Ireland
  "Armagh",
  "Bangor",
  "Belfast",
  "Derry / Londonderry",
  "Lisburn",
  "Newry",
  "Enniskillen",
];
