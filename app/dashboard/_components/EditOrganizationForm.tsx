"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEditOrganizationFromDB } from "@/hooks/create-organization";
import { useEffect, useState } from "react";
import EditGoogleMapWithAddressInput from "./EditGoogleMapWithAddressInput";
import { Nationality, Organization, SocialMedia } from "@prisma/client";
import { Separator } from "@radix-ui/react-select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditLogoUpload from "./EditLogoUpload";
import { Button } from "@/components/ui/button";
import EditCoverPhoto from "./EditCoverPhoto";
import EditGallery from "./EditiGallery";
import EditOrganizationCounter from "./EditOrganizationCounter";
import EditFeatures from "./EditFeatures";
import EditSocialMedia from "./EditSocialMedia";
import EditStudentNation from "./editStudentNation";

const EditOrganizationForm = ({
  organizationData,
  studentNations,
  socialMedia = {} as SocialMedia,
}: {
  organizationData: Organization;
  studentNations: { nation: string; count: number }[];
  socialMedia: SocialMedia;
}) => {
  const { register, submit, setValue, watch, reset, getValues, isPending } =
    useEditOrganizationFromDB(organizationData);

  const [lat, setLat] = useState<number>(() => getValues("lat") ?? 0);
  const [lng, setLng] = useState<number>(() => getValues("lng") ?? 0);
  const [location, setLocation] = useState<string>(
    () => getValues("location") ?? "",
  );
  const [logo, setLogo] = useState(() => getValues("logo") ?? "");
  const [coverPhoto, setCoverPhoto] = useState(
    () => getValues("coverPhoto") ?? "",
  );
  const [gallery, setGallery] = useState(() => getValues("gallery") ?? []);

  useEffect(() => {
    setValue("lat", lat);
    setValue("lng", lng);
    setValue("location", location);
    setValue("logo", logo);
    setValue("coverPhoto", coverPhoto);
    setValue("gallery", gallery);
  }, [setValue, lat, lng, location, logo, coverPhoto, gallery, reset]);

  const initialSocialMedia = {
    facebook: socialMedia.facebook ?? "",
    instagram: socialMedia.instagram ?? "",
    website: socialMedia.website ?? "",
  };

  return (
    <div className="mx-auto min-w-full max-w-4xl rounded-lg bg-white p-6">
      <div className="flex w-full flex-col gap-8">
        <h1 className="mb-4 w-full text-center text-4xl font-bold text-rose-500">
          Edit Organization
        </h1>

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
              <EditLogoUpload logoSrcId={logo} setLogo={setLogo} />
            </CardContent>
          </Card>

          <Card className="flex flex-col gap-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Cover Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <EditCoverPhoto
                photoId={coverPhoto}
                setCoverPhoto={setCoverPhoto}
              />
            </CardContent>
          </Card>

          <Card className="flex flex-col gap-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <EditGallery gallery={gallery} setGallery={setGallery} />
            </CardContent>
          </Card>

          <Card className="flex flex-col gap-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Edit Details of the center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-8">
                <EditOrganizationCounter
                  title="Lesson Duration"
                  subtitle="Duration of a lesson?"
                  type="lessonDuration"
                  counterType="mins"
                  setValue={setValue}
                  watch={watch}
                />
                <EditOrganizationCounter
                  title="Minimum Age"
                  subtitle="Minimum age of a lesson?"
                  type="studentMinAge"
                  counterType="years old"
                  setValue={setValue}
                  watch={watch}
                />
                <EditOrganizationCounter
                  title="Maximum Age"
                  subtitle="Maximum age of a lesson?"
                  type="studentMaxAge"
                  counterType="years old"
                  setValue={setValue}
                  watch={watch}
                />
                <EditOrganizationCounter
                  title="Average Number per Class"
                  subtitle="Average number of students per class?"
                  type="averageStudentPerClass"
                  counterType="students"
                  setValue={setValue}
                  watch={watch}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="flex min-h-full w-full flex-col gap-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Edit Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EditFeatures setValue={setValue} watch={watch} />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex w-full">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
      <div className="mt-12">
        <Card className="flex min-h-full w-full flex-col gap-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Edit Social Media
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EditSocialMedia
              organizationId={organizationData.id}
              initialSocialMedia={initialSocialMedia}
            />
          </CardContent>
        </Card>

        <Card className="flex min-h-full w-full flex-col gap-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Edit Student Nation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EditStudentNation
              organizationId={organizationData.id}
              studentNations={studentNations}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditOrganizationForm;
