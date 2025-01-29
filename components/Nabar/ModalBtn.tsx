"use client";

import { useCreateModal } from "@/hooks/modal";
import { Button } from "../ui/button";

type Props = {};

const ModalBtn = (props: Props) => {
  const { open } = useCreateModal();
  return <Button onClick={open}>Create Course</Button>;
};

export default ModalBtn;
