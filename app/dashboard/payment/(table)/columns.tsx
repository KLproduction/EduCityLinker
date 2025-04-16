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
import {
  useGetOrganizationByEnrollmentModal,
  useGetOrganizationByPaymentIdModal,
} from "@/hooks/enrollment";
import { EnrollmentPayment } from "@prisma/client";

type OrganizationCellProps = {
  paymentId: string;
};
const OrganizationCell = ({ paymentId }: OrganizationCellProps) => {
  const { data } = useGetOrganizationByPaymentIdModal(paymentId);
  return (
    <div className="flex justify-center">
      <span className="font-medium">{data?.organization?.name || "—"}</span>
    </div>
  );
};

export const columns: ColumnDef<EnrollmentPayment>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
              <NavigateButton to={`/dashboard/payment/${payment.id}`}>
                <span className="text-rose-500">View Enrollment Details</span>
              </NavigateButton>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy Payment ID
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
      const paymentId = row.getValue("id") as string;

      return <OrganizationCell paymentId={paymentId} />;
    },
  },

  {
    accessorKey: "depositAmount",
    header: "Deposit Amount",
    cell: ({ row }) => (
      <span>{formattedPrice(row.getValue("depositAmount") as number)}</span>
    ),
  },
  {
    accessorKey: "remainingBalance",
    header: "Remaining Balance",
    cell: ({ row }) => (
      <span>{formattedPrice(row.getValue("remainingBalance") as number)}</span>
    ),
  },
  {
    accessorKey: "totalPaidAmount",
    header: "Total Paid",
    cell: ({ row }) => (
      <span>{formattedPrice(row.getValue("totalPaidAmount") as number)}</span>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("paymentMethod")}</span>
    ),
  },
  {
    accessorKey: "depositPaymentDate",
    header: "Deposit Payment Date",
    cell: ({ row }) => {
      const date = row.getValue("depositPaymentDate") as Date;
      return <span>{date?.toLocaleDateString("en-GB")}</span>;
    },
  },
  {
    accessorKey: "fullPaymentDate",
    header: "Full Payment Date",
    cell: ({ row }) => {
      const date = row.getValue("fullPaymentDate") as Date;
      return <span>{date?.toLocaleDateString("en-GB")}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span>{row.getValue("status")}</span>,
  },
];
