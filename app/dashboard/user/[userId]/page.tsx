import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import EditUserForm from "./_components/EditUserForm";
import { getUserById } from "@/data/user";
import { getEnrollmentRequestsByUserIdAction } from "@/actions/create-enrollment";
import UserEnrollmentDetails from "@/app/enrollment/_compoents/UserEnrollmentDetails";
import DashboardUserEnrollmentDetails from "./_components/DashboardUserEnrollmentDetails";

type Props = {
  params: {
    userId: string;
  };
};

const UserEditPage = async ({ params }: Props) => {
  const data = await getUserById(params.userId);

  const UserEnrollment = async () => {
    const enrollmentData = await getEnrollmentRequestsByUserIdAction(
      params.userId,
    );
    const enrollment = enrollmentData?.enrollmentRequests;
    if (!enrollment) return;

    return (
      <>
        {enrollment.map((item, index) => (
          <div className="my-6 flex flex-col gap-3" key={index}>
            <DashboardUserEnrollmentDetails
              enrollmentData={item}
              userId={params.userId}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full justify-start">
        <Button asChild>
          <Link
            href="/dashboard/user"
            className="flex items-center justify-center gap-3"
          >
            <ArrowBigLeft className="h-6 w-6" />
            Back
          </Link>
        </Button>
      </div>
      <div className="my-12 flex w-full flex-col gap-5">
        <EditUserForm user={data!} />
        {await UserEnrollment()}
      </div>
    </div>
  );
};

export default UserEditPage;
