import { getEnrollmentRequestsWithOrganizationByIdAction } from "@/actions/create-enrollment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { db } from "@/lib/db";
import { EnrollmentConfirmationState } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formattedPrice } from "@/lib/formatPrice";
import EnrollmentInfo from "./_components/EnrollmentInfo";
import EditPaymentForm from "./_components/EditPaymentForm";

type Props = {
  params: {
    paymentId: string;
  };
};

const PaymentEditPage = async ({ params }: Props) => {
  const payment = await db.enrollmentPayment.findUnique({
    where: {
      id: params.paymentId,
    },
  });

  const confirmation = await db.enrollmentConfirmation.findFirst({
    where: {
      id: payment?.confirmationId,
    },
  });

  const data = await getEnrollmentRequestsWithOrganizationByIdAction(
    confirmation?.requestId!,
  );

  if (!data || !payment || !confirmation) return;

  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full justify-start">
        <Button asChild>
          <Link
            href="/dashboard/enrollment"
            className="flex items-center justify-center gap-3"
          >
            <ArrowBigLeft className="h-6 w-6" />
            Back
          </Link>
        </Button>
      </div>
      <div className="my-12 flex flex-col gap-5">
        <EditPaymentForm
          payment={payment}
          confirmation={confirmation}
          enrollment={data.enrollmentRequests!}
        />
        <EnrollmentInfo
          enrollment={data.enrollmentRequests!}
          organization={data.enrollmentRequests?.organization!}
          confirmation={confirmation || undefined}
          payment={payment || undefined}
        />
      </div>
    </div>
  );
};

export default PaymentEditPage;
