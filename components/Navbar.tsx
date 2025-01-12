import Link from "next/link";
import { Button } from "./ui/button";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { LoginButtonProps } from "./auth/loginBtn";
import SignOutBtn from "./auth/SignOutBtn";
import { currentUser } from "@/lib/auth";
import UserAvatar from "./auth/global/UserAvatar";

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

  return (
    <nav className="fixed z-[100] h-30 inset-x-0 top-0 w-full bg-white/75 backdrop-blur-lg transition-all">
      <ul className="flex items-center justify-around">
        {navList.map(({ label, path }) => (
          <li key={label}>
            <Link href={path}>{label}</Link>
          </li>
        ))}
        {!user?.id ? (
          <div className="flex gap-3 items-center p-3">
            <LoginButtonProps mode="modal" asChild>
              <Button variant={"default"} size={"lg"}>
                Sign In
              </Button>
            </LoginButtonProps>
            <div className=" border-r border-zinc-800" />
            <Link href={"/auth/register"} className=" text-gray-500">
              Sign up
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 items-center justify-center p-3">
            <UserAvatar name={user?.name!} image={user?.image || ""} />

            <SignOutBtn />
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
