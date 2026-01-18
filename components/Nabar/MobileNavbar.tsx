import Link from "next/link";
import { Button } from "../ui/button";
import { LoginButtonProps } from "../auth/loginBtn";
import { currentUser } from "@/lib/auth";
import UserAvatar from "../global/UserAvatar";
import MySearch from "./MySearch";
import { cn } from "@/lib/utils";
import MyContainer from "../Container";
import Categories from "./Categories";
import ModalBtn from "./ModalBtn";
import { UserRole } from "@prisma/client";
import MobileSignIn from "./MobileSignIn";
import { hover, motion } from "framer-motion";
import { brandName } from "@/data/data";

const navList = [
  {
    label: "HOME",
    path: "/",
  },
  {
    label: "ABOUT",
    path: "/about",
  },
  {
    label: "COURSES",
    path: "/courses",
  },
  {
    label: "LOCATIONS",
    path: "/locations",
  },
  {
    label: "PARTNERS",
    path: "/partners",
  },
];

const MobileNavbar = async () => {
  const user = await currentUser();
  const isAdmin = user?.role === UserRole.ADMIN ? true : false;
  const isOrganizer = user?.role === UserRole.ORGANIZER ? true : false;

  return (
    <nav className="group fixed inset-x-0 top-0 z-[100] h-20 w-full bg-white/75 backdrop-blur-md transition-all">
      <MyContainer>
        <ul className="flex h-full items-center justify-between">
          <div>
            <h2
              className={cn(
                "text-4xl font-bold text-rose-500 transition-all duration-300 group-hover:scale-50",
              )}
            >
              <Link href="/">
                <h4>{brandName}</h4>
              </Link>
            </h2>
          </div>
          <div className="scale-90 transition-all duration-300 group-hover:scale-100">
            <MySearch />
          </div>

          {!user?.id ? (
            <MobileSignIn />
          ) : (
            <div className="flex items-center justify-center gap-3 p-3">
              <div className={cn("hidden sm:block")}>
                <div className={cn(!isOrganizer && "hidden")}>
                  <ModalBtn />
                </div>
              </div>

              <UserAvatar
                name={user?.name!}
                userId={user?.id}
                image={user?.image || ""}
                isAdmin
                isOrganizer
              />
            </div>
          )}
        </ul>
        <Categories />
      </MyContainer>
    </nav>
  );
};

export default MobileNavbar;
