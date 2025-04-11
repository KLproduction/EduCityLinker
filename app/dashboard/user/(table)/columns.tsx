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
import {
  type EnrollmentRequest,
  EnrollmentRequestState,
  User,
  UserRole,
} from "@prisma/client";
import { cn } from "@/lib/utils";

type OrganizationCellProps = {
  organizationId: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
              <NavigateButton to={`/dashboard/user/${user.id}`}>
                <span className="text-rose-500">View User Details</span>
              </NavigateButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: "name",
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
    accessorKey: "email",
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
    accessorKey: "emailVerified",
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="group flex items-center gap-1 px-2 py-1 hover:bg-muted/50"
        >
          <span>Created At</span>
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
      const data = row.getValue("createdAt") as Date;
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
    accessorKey: "role",
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
            <div>Role</div>
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
      const data = row.getValue("role") as string;
      const formattedData = data.toLocaleUpperCase();
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            data === UserRole.USER && "bg-yellow-100 text-yellow-800",
            data === UserRole.ADMIN && "bg-green-100 text-green-800",
            data === UserRole.ORGANIZER && "bg-red-100 text-red-800",
          )}
        >
          {formattedData}
        </span>
      );
    },
  },
  {
    accessorKey: "isTwoFactorEnabled",
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
            <div>Role</div>
            <div>
              {isSortedAsc === "asc" && <AiOutlineCaretUp />}
              {isSortedAsc === "desc" && <AiOutlineCaretDown />}
              {!isSortedAsc && <BsChevronExpand />}
            </div>
          </Button>
        </div>
      );
    },
  },
];
