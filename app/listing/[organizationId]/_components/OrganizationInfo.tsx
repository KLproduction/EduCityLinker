import MyContainer from "@/components/Container";
import StudentNationPieChat from "@/components/global/StudentNationPieChat";
import GoogleMap from "@/components/Map";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { accommodationTypes, features, schoolFacilities } from "@/data/data";
import { Organization } from "@prisma/client";
import { Building2, Check, Clock, Users, Wifi } from "lucide-react";
import React from "react";
import OrganizationGallery from "./OrganizationGallery";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useAccommodationModal } from "@/hooks/modal";

type Props = {
  organization: Organization;
  studentNation?: {
    nation: string;
    count: number;
  }[];
};

const OrganizationInfo = ({ organization, studentNation }: Props) => {
  const { open } = useAccommodationModal();
  return (
    <div className="my-8 flex h-full w-full flex-col flex-wrap">
      <MyContainer>
        {/* FEATURES */}
        <div className="my-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Features</h3>
            <div className="flex flex-col gap-5">
              {organization.feature.map((feature, index) => {
                const featureData = features.find((f) => f.label === feature);
                const IconComponent = featureData?.icon;
                return (
                  <div key={index} className="flex items-center">
                    {IconComponent && (
                      <IconComponent size={24} className="mr-3 text-rose-500" />
                    )}
                    <p className="text-sm">{feature}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Facilities</h3>
            <div className="flex flex-col gap-5">
              {organization.facility.map((fac, index) => {
                const featureData = schoolFacilities.find(
                  (f) => f.label === fac,
                );
                const IconComponent = featureData?.icon;
                return (
                  <div key={index} className="flex items-center">
                    {IconComponent && (
                      <IconComponent size={24} className="mr-3 text-rose-500" />
                    )}
                    <p className="text-sm">{fac}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <section className="mb-12 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Class Size</h2>
            </div>
            <p className="mt-2 text-muted-foreground">
              Average {organization.averageStudentPerClass} students per class
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Lesson Duration</h2>
            </div>
            <p className="mt-2 text-muted-foreground">
              {organization.lessonDuration}
            </p>
          </Card>
        </section>

        <div>
          <OrganizationGallery title="Gallery" organizer={organization} />
        </div>

        <div className="flex w-full items-center justify-center">
          {studentNation && <StudentNationPieChat data={studentNation} />}
        </div>
        {organization.accommodationTypes !== "No Accommodation" && (
          <section className="my-12 flex flex-col justify-center gap-5">
            <h3 className="mb-6 text-2xl font-semibold">
              Accommodation Details
            </h3>
            <Card className="grid gap-6 md:grid-cols-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Accommodation Type</h2>
                </div>
                <p className="mt-2 text-muted-foreground">
                  {organization.accommodationTypes}
                </p>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h2 className="font-semibold">Distance to Amenities</h2>
                  <p className="text-muted-foreground">
                    {organization.distanceOfAmenities} miles
                  </p>
                </div>
              </CardContent>

              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Room Details</h2>
                </div>

                <div className="mt-2">
                  <h5 className="text-sm font-medium">Available Room Types:</h5>
                  <p className="text-muted-foreground">
                    {organization.roomTypes}
                  </p>
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium">Room Amenities:</h5>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {organization.roomAmenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-center md:justify-start">
                  <InteractiveHoverButton
                    text="Details"
                    onClick={() => open()}
                  />
                </div>
              </CardFooter>
            </Card>
          </section>
        )}
      </MyContainer>
    </div>
  );
};

export default OrganizationInfo;
