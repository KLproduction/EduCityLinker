import { useState } from "react";
import {
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { useForm } from "react-hook-form";
import { createCourseSchema } from "@/schemas";
import { z } from "zod";

export const useCreateCourseModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-course",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
export const useCreateOrganizerModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-organizer",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};

export const useLoginModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "login-modal",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
