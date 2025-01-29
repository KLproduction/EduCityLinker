"use client";

import { useLoginModal } from "@/hooks/modal";
import { Button } from "../ui/button";

type Props = {};

const LoginModalBtn = (props: Props) => {
  const { open } = useLoginModal();
  return <Button onClick={open}>Sign In</Button>;
};

export default LoginModalBtn;
