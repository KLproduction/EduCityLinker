"use server";

import { signOutAction } from "@/actions/(auth)/signOut";
import { Button } from "../ui/button";
import { CgLogOut } from "react-icons/cg";

export const signOutonClickHandler = async () => {
  await signOutAction();
};
