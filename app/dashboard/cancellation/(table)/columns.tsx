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
  CancellationState,
  EnrollmentCancellation,
  EnrollmentRequestState,
} from "@prisma/client";
import { formattedPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { useGetOrganizationByCancellationId } from "@/hooks/enrollment";

type OrganizationCellProps = {
  cancellationId: string;
};
const OrganizationCell = ({ cancellationId }: OrganizationCellProps) => {
  const { organization: data } =
    useGetOrganizationByCancellationId(cancellationId);
  return (
    <div className="flex justify-center">
      <span className="font-medium">{data?.name || "—"}</span>
    </div>
  );
};

export const columns: ColumnDef<EnrollmentCancellation>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const cancellation = row.original;

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
              <NavigateButton to={`/dashboard/cancellation/${cancellation.id}`}>
                <span className="text-rose-500">View Cancellation Details</span>
              </NavigateButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(cancellation.id)}
            >
              Copy Cancellation ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "id",
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
      const cancellationId = row.getValue("id") as string;

      return <OrganizationCell cancellationId={cancellationId} />;
    },
  },

  {
    accessorKey: "reason",
    header: () => <div className="text-center">Reason</div>,
    cell: ({ row }) => {
      const data = row.getValue("reason") as string;
      return <div className="text-center">{data || "—"}</div>;
    },
  },
  {
    accessorKey: "cancelRequestedAt",
    header: () => <div className="text-center">Requested At</div>,
    cell: ({ row }) => {
      const data = row.getValue("cancelRequestedAt") as Date;

      const formattedData = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes().toString().padStart(2, "0")}`;

      return <div className="text-center">{formattedData}</div>;
    },
  },
  {
    accessorKey: "cancelledAt",
    header: () => <div className="text-center">Cancelled At</div>,
    cell: ({ row }) => {
      const data = row.getValue("cancelledAt") as Date | null;
      const formattedData = data
        ? data.getDate() +
          "/" +
          (data.getMonth() + 1) +
          "/" +
          data.getFullYear()
        : "—";
      return <div className="text-center">{formattedData}</div>;
    },
  },
  {
    accessorKey: "refundAmount",
    header: () => <div className="text-center">Refund Amount</div>,
    cell: ({ row }) => {
      const data = row.getValue("refundAmount") as number | null;
      const formattedData = data !== null ? formattedPrice(data) : "—";
      return <div className="text-center font-medium">{formattedData}</div>;
    },
  },
  {
    accessorKey: "refundProcessed",
    header: () => <div className="text-center">Refund Processed</div>,
    cell: ({ row }) => {
      const data = row.getValue("refundProcessed") as CancellationState | null;
      return (
        <div className="text-center">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              data === CancellationState.PENDING && "bg-red-100 text-gray-800",
              data === CancellationState.PROCESSING &&
                "bg-yellow-100 text-yellow-800",
              data === CancellationState.PROCESSED &&
                "bg-green-100 text-green-800",
            )}
          >
            {data}
          </span>
        </div>
      );
    },
  },
];
