import { getEnrollmentRequestsWithOrganizationByIdAction } from "@/actions/create-enrollment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditEnrollmentForm from "./_components/EditEnrollmentForm";
import { ArrowBigLeft } from "lucide-react";

type Props = {
  params: {
    enrollmentId: string;
  };
};

const EnrollmentEditPage = async ({ params }: Props) => {
  const data = await getEnrollmentRequestsWithOrganizationByIdAction(
    params.enrollmentId,
  );

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
      <div>
        <EditEnrollmentForm
          enrollment={data.enrollmentRequests!}
          organization={data.enrollmentRequests?.organization!}
        />
      </div>
    </div>
  );
};

export default EnrollmentEditPage;
