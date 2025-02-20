"use client";

import { useCreateCourseModal } from "@/hooks/modal";
import { Button } from "../ui/button";

type Props = {};

const ModalBtn = (props: Props) => {
  const { open } = useCreateCourseModal();
  return <Button onClick={open}>Create Course</Button>;
};

export default ModalBtn;
