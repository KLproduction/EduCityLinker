import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SuperAdminForm from "./_components/superAdminForm";
import { currentUser } from "@/lib/auth";

const SuperAdminPage = async () => {
  const user = await currentUser();
  if (user?.email !== "kent.law.production01@gmail.com") {
    return <div className="h-full w-full">Unauthorized</div>;
  }
  return (
    <div className="mt-20 flex min-h-screen w-full justify-center">
      <SuperAdminForm />
    </div>
  );
};

export default SuperAdminPage;
