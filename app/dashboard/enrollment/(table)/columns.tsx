"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";
import { NavigateButton } from "@/components/global/NavigateButton";
import { type EnrollmentRequest, EnrollmentRequestState } from "@prisma/client";
import { formattedPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { useGetOrganizationByEnrollmentModal } from "@/hooks/enrollment";

export const columns: ColumnDef<EnrollmentRequest>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const enrollment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <NavigateButton to={`/dashboard/enrollment/${enrollment.id}`}>
                <span className="text-rose-500">View Enrollment Details</span>
              </NavigateButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(enrollment.id)}
            >
              Copy Enrollment ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "organizationId",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group flex items-center gap-1 px-2 py-1 hover:bg-muted/50"
        >
          <span>Organization</span>
          <div className="ml-1 transform text-muted-foreground">
            {isSortedAsc === "asc" ? (
              <AiOutlineCaretUp className="h-4 w-4 text-primary" />
            ) : isSortedAsc === "desc" ? (
              <AiOutlineCaretDown className="h-4 w-4 text-primary" />
            ) : (
              <BsChevronExpand className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            )}
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      //error
      const data = useGetOrganizationByEnrollmentModal(
        row.getValue("organizationId"),
      );

      return (
        <div className="flex justify-center">
          <span className="font-medium">
            {data.data?.organization?.name || "—"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group flex items-center gap-1 px-2 py-1 hover:bg-muted/50"
        >
          <span>First Name</span>
          <div className="ml-1 transform text-muted-foreground">
            {isSortedAsc === "asc" ? (
              <AiOutlineCaretUp className="h-4 w-4 text-primary" />
            ) : isSortedAsc === "desc" ? (
              <AiOutlineCaretDown className="h-4 w-4 text-primary" />
            ) : (
              <BsChevronExpand className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            )}
          </div>
        </Button>
      );
    },
  },
  {
    accessorKey: "sureName",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group flex items-center gap-1 px-2 py-1 hover:bg-muted/50"
        >
          <span>Sure Name</span>
          <div className="ml-1 transform text-muted-foreground">
            {isSortedAsc === "asc" ? (
              <AiOutlineCaretUp className="h-4 w-4 text-primary" />
            ) : isSortedAsc === "desc" ? (
              <AiOutlineCaretDown className="h-4 w-4 text-primary" />
            ) : (
              <BsChevronExpand className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            )}
          </div>
        </Button>
      );
    },
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group flex items-center gap-1 px-2 py-1 hover:bg-muted/50"
        >
          <span>Email</span>
          <div className="ml-1 transform text-muted-foreground">
            {isSortedAsc === "asc" ? (
              <AiOutlineCaretUp className="h-4 w-4 text-primary" />
            ) : isSortedAsc === "desc" ? (
              <AiOutlineCaretDown className="h-4 w-4 text-primary" />
            ) : (
              <BsChevronExpand className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            )}
          </div>
        </Button>
      );
    },
  },
  {
    accessorKey: "contactNumber",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group flex items-center gap-1 px-2 py-1 hover:bg-muted/50"
        >
          <span>Contact Number</span>
          <div className="ml-1 transform text-muted-foreground">
            {isSortedAsc === "asc" ? (
              <AiOutlineCaretUp className="h-4 w-4 text-primary" />
            ) : isSortedAsc === "desc" ? (
              <AiOutlineCaretDown className="h-4 w-4 text-primary" />
            ) : (
              <BsChevronExpand className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            )}
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("contactNumber") as string;

      return (
        <div className="text-center">
          <span>{data}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group flex items-center gap-1 px-2 py-1 hover:bg-muted/50"
        >
          <span>Start Date</span>
          <div className="ml-1 transform text-muted-foreground">
            {isSortedAsc === "asc" ? (
              <AiOutlineCaretUp className="h-4 w-4 text-primary" />
            ) : isSortedAsc === "desc" ? (
              <AiOutlineCaretDown className="h-4 w-4 text-primary" />
            ) : (
              <BsChevronExpand className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            )}
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("startDate") as Date;
      const formattedData =
        data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
      return (
        <div className="text-center">
          <span>{formattedData}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "weeks",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group flex items-center gap-1 px-2 py-1 hover:bg-muted/50"
        >
          <span>Weeks</span>
          <div className="ml-1 transform text-muted-foreground">
            {isSortedAsc === "asc" ? (
              <AiOutlineCaretUp className="h-4 w-4 text-primary" />
            ) : isSortedAsc === "desc" ? (
              <AiOutlineCaretDown className="h-4 w-4 text-primary" />
            ) : (
              <BsChevronExpand className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            )}
          </div>
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("weeks") as string;

      return (
        <div className="text-center">
          <span className="font-medium">{data}</span>
          <span className="ml-1 text-xs text-muted-foreground">week(s)</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <div className="flex justify-center">
          <Button
            variant={"ghost"}
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === "asc");
            }}
          >
            <div>Status</div>
            <div>
              {isSortedAsc === "asc" && <AiOutlineCaretUp />}
              {isSortedAsc === "desc" && <AiOutlineCaretDown />}
              {!isSortedAsc && <BsChevronExpand />}
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const data = row.getValue("status") as string;
      const formattedData = data.toLocaleUpperCase();
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            data === EnrollmentRequestState.PENDING &&
              "bg-yellow-100 text-yellow-800",
            data === EnrollmentRequestState.CONFIRM_BY_CENTER &&
              "bg-green-100 text-green-800",
            data === EnrollmentRequestState.CANCELLED &&
              "bg-red-100 text-red-800",
          )}
        >
          {formattedData}
        </span>
      );
    },
  },

  {
    accessorKey: "totalPrice",
    header: () => <div className="text-center">Course Price</div>,
    cell: ({ row }) => {
      const data = row.getValue("totalPrice") as number;
      const formatPrice = formattedPrice(data);
      return (
        <div className="text-center font-medium text-primary">
          {formatPrice}
        </div>
      );
    },
  },
  {
    accessorKey: "addOnPrice",
    header: () => <div className="text-center">Add-on Price</div>,
    cell: ({ row }) => {
      const data = row.getValue("addOnPrice") as number;
      const formatPrice = formattedPrice(data);
      return (
        <div className="text-center font-medium text-primary">
          {formatPrice}
        </div>
      );
    },
  },
];
