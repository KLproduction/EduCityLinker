"use client";

import {
  getEnrollmentRequestsByIdAction,
  getEnrollmentRequestsByUserIdAction,
  onDeleteEnrollmentRequestAction,
} from "@/actions/create-enrollment";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
export const useAccommodationModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "accommodation-modal",
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
export const useCreateEnrollmentModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-enrollment-modal",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true }),
  );

  const [selectedListingId, setSelectedListingId] = useQueryState(
    "enrollment-listing-id",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );
  const [selectedOrganizationId, setSelectedOrganizationId] = useQueryState(
    "enrollment-organization-id",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  );

  const open = (listingId: string, organizationId: string) => {
    setIsOpen(true);
    setSelectedListingId(listingId);
    setSelectedOrganizationId(organizationId);
  };
  const close = () => {
    setIsOpen(false);
    setSelectedListingId("");
    setSelectedOrganizationId("");
  };

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setSelectedListingId("");
        setSelectedOrganizationId("");
      }, 300); // Delay to match modal closing animation duration

      return () => clearTimeout(timeout); // Cleanup if modal reopens quickly
    }
  }, [isOpen]);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
    selectedListingId,
    setSelectedListingId,
    selectedOrganizationId,
    setSelectedOrganizationId,
  };
};

export const useCancelEnrollmentModal = (enrollmentId: string) => {
  const [isOpen, setIsOpen] = useQueryState(
    "cancel-enrollment-modal",
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
export const useAcceptEnrollmentModal = (enrollmentId: string) => {
  const [isOpen, setIsOpen] = useQueryState(
    "accept-enrollment-modal",
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
