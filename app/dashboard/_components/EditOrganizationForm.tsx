"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useEditOrganization,
  useEditOrganizationFromDB,
} from "@/hooks/create-organization";
import { useEffect, useState } from "react";
import EditGoogleMapWithAddressInput from "./EditGoogleMapWithAddressInput";
import { Organization } from "@prisma/client";
import { Separator } from "@radix-ui/react-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditLogoUpload from "./EditLogoUpload";
import { Button } from "@/components/ui/button";

const EditOrganizationForm = ({
  organizationData,
}: {
  organizationData: Organization;
}) => {
  const { register, submit, setValue, watch, reset, getValues, isPending } =
    useEditOrganizationFromDB(organizationData);

  const [lat, setLat] = useState<number>(() => getValues("lat") ?? 0);
  const [lng, setLng] = useState<number>(() => getValues("lng") ?? 0);
  const [location, setLocation] = useState<string>(
    () => getValues("location") ?? "",
  );
  const [logo, setLogo] = useState(() => getValues("logo") ?? "");

  useEffect(() => {
    setValue("lat", lat);
    setValue("lng", lng);
    setValue("location", location);
    setValue("logo", logo);
  }, [setValue, lat, lng, location, logo, reset]);

  return (
    <div className="mx-auto min-w-full max-w-4xl rounded-lg bg-white p-6">
      <h1 className="mb-4 text-2xl font-semibold">Edit Organization</h1>

      <form onSubmit={submit} className="space-y-4">
        <Card className="flex flex-col gap-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm font-medium text-zinc-600">
              Organization Name
            </p>
            <Input
              {...register("name")}
              className="mb-4 border-zinc-500 bg-zinc-50"
              placeholder="Center Name"
            />
            <p className="mb-3 text-sm font-medium text-zinc-600">
              Organization Description
            </p>
            <Textarea
              {...register("description")}
              className="border-zinc-500 bg-zinc-50"
              rows={6}
              placeholder="Center description"
            />
          </CardContent>
        </Card>

        <Card className="flex flex-col gap-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Location Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-3 text-sm font-medium text-zinc-600">
              Organization Location
            </p>
            <EditGoogleMapWithAddressInput
              centerLocation={location ?? getValues("location")}
              centerLat={lat ?? getValues("lat")}
              centerLng={lng ?? getValues("lng")}
              setLat={setLat}
              setLng={setLng}
              setLocation={setLocation}
            />
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Logo</CardTitle>
          </CardHeader>
          <CardContent>
            <EditLogoUpload logoSrcId={logo} setLogoSrcId={setLogo} />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button type="submit" disabled={isPending} className="px-4 py-2">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default EditOrganizationForm;
