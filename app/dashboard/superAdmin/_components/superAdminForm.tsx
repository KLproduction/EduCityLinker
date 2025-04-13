"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useSuperAdmin } from "@/hooks/super-admin";
import { useAdminAddDummyEnrollmentRequests } from "@/hooks/super-admin";
import { useAdminDeleteDummyEnrollmentRequests } from "@/hooks/super-admin";
import { Separator } from "@/components/ui/separator";

const SuperAdminForm = () => {
  const {
    deleteListings,
    isDeletePending,
    deleteEnrollmentRequests,
    isDeleteEnrollmentPending,
  } = useSuperAdmin();

  const { addDummyEnrollmentRequests, isAddingDummyPending } =
    useAdminAddDummyEnrollmentRequests();
  const { deleteDummyEnrollmentRequests, isDeletingDummyEnrollment } =
    useAdminDeleteDummyEnrollmentRequests();

  return (
    <Card className="w-full max-w-md p-6">
      <CardHeader>
        <h2 className="text-xl font-semibold">Super Admin Controls</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          variant="destructive"
          onClick={() => deleteListings()}
          disabled={isDeletePending}
        >
          {isDeletePending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting Listings...
            </>
          ) : (
            "Delete All Listings"
          )}
        </Button>

        <Button
          variant="destructive"
          onClick={() => deleteEnrollmentRequests()}
          disabled={isDeleteEnrollmentPending}
        >
          {isDeleteEnrollmentPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting Enrollment Requests...
            </>
          ) : (
            "Delete All Enrollment Requests"
          )}
        </Button>
        <Separator className="my-4" />
        <Button
          variant="default"
          onClick={() => addDummyEnrollmentRequests(10)}
          disabled={isAddingDummyPending}
        >
          {isAddingDummyPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Dummy Enrollments...
            </>
          ) : (
            "Add Dummy Enrollment Requests"
          )}
        </Button>

        <Button
          variant="destructive"
          onClick={() => deleteDummyEnrollmentRequests()}
          disabled={isDeletingDummyEnrollment}
        >
          {isDeletingDummyEnrollment ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting Dummy Enrollments...
            </>
          ) : (
            "Delete Dummy Enrollment Requests"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuperAdminForm;
