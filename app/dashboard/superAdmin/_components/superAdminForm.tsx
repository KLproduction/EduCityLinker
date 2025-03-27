"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useSuperAdmin } from "@/hooks/super-admin";

const SuperAdminForm = () => {
  const {
    deleteListings,
    isDeletePending,
    deleteEnrollmentRequests,
    isDeleteEnrollmentPending,
  } = useSuperAdmin();

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
      </CardContent>
    </Card>
  );
};

export default SuperAdminForm;
