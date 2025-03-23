"use client";

import { useCreateCourseModal } from "@/hooks/modal";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const ModalBtn = (props: Props) => {
  const router = useRouter();

  return <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>;
};

export default ModalBtn;
