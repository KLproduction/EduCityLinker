import Link from "next/link";
import { Button } from "../ui/button";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { LoginButtonProps } from "../auth/loginBtn";
import SignOutBtn from "../auth/SignOutBtn";
import { currentUser } from "@/lib/auth";
import UserAvatar from "../global/UserAvatar";
import MySearch from "./MySearch";
import { cn } from "@/lib/utils";
import MyContainer from "../Container";
import Categories from "./Categories";
import NavLogo from "./NavLogo";
import ModalBtn from "./ModalBtn";
import LoginModalBtn from "./LoginModalBtn";
import { getUserById } from "@/data/user";

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

const Navbar = async () => {
  const user = await currentUser();
  const userDetails = await getUserById(user?.id!);

  console.log(`sessionId, ${user?.id}, userDetails, ${userDetails?.id}`);

  const isAdmin = user?.role === "ADMIN" ? true : false;
  const isOrganizer =
    userDetails?.organization &&
    userDetails.organization.length > 0 &&
    userDetails.organization[0].id
      ? true
      : false;

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] h-20 w-full bg-white/75 backdrop-blur-md transition-all">
      <MyContainer>
        <ul className="flex h-full items-center justify-between">
          {/* {navList.map(({ label, path }) => (
          <li key={label}>
            <Link href={path}>{label}</Link>
          </li>
        ))} */}
          <div>
            <NavLogo />
          </div>
          <div className="hidden md:block">
            <MySearch />
          </div>

          {!user?.id ? (
            <div className="flex items-center gap-3 p-3">
              <LoginButtonProps mode="modal" asChild>
                <Button variant={"default"} size={"lg"}>
                  Sign In
                </Button>
              </LoginButtonProps>

              <div className="border-r border-zinc-800" />
              <Link href={"/auth/register"} className="text-gray-500">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 p-3">
              <div className={cn("hidden sm:block")}>
                <div className={cn(!isOrganizer && "hidden")}>
                  <ModalBtn />
                </div>
              </div>

              <UserAvatar
                name={user?.name!}
                userId={userDetails?.id}
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

export default Navbar;
