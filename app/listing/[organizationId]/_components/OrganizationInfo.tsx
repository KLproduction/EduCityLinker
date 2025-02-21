import MyContainer from "@/components/Container";
import StudentNationPieChat from "@/components/global/StudentNationPieChat";
import GoogleMap from "@/components/Map";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { accommodationTypes, features, schoolFacilities } from "@/data/data";
import { Organization } from "@prisma/client";
import { Building2, Check, Clock, Users, Wifi } from "lucide-react";
import React from "react";

type Props = {
  organization: Organization;
  studentNation?: {
    nation: string;
    count: number;
  }[];
};

const OrganizationInfo = ({ organization, studentNation }: Props) => {
  return (
    <div className="flex h-full w-full flex-col flex-wrap">
      <MyContainer>
        <div className="flex w-full flex-col justify-center gap-3">
          <h1 className="text-lg font-bold md:text-3xl">
            {organization.location}
          </h1>
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            {organization.description && (
              <div className="flex w-full flex-col justify-start gap-4 md:w-1/2">
                <p className="mb-6 text-muted-foreground">
                  {organization.description}
                </p>
                <StarRating rating={organization.rating} readOnly />
              </div>
            )}
            <GoogleMap
              lat={organization.lat}
              lng={organization.lng}
              className=""
            />
          </div>
        </div>
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
                      <IconComponent
                        size={24}
                        className="mr-3 text-green-500"
                      />
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
                      <IconComponent
                        size={24}
                        className="mr-3 text-green-500"
                      />
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
              <h4 className="font-semibold">Class Size</h4>
            </div>
            <p className="mt-2 text-muted-foreground">
              Average {organization.averageStudentPerClass} students per class
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h4 className="font-semibold">Lesson Duration</h4>
            </div>
            <p className="mt-2 text-muted-foreground">
              {organization.lessonDuration}
            </p>
          </Card>
        </section>
        {organization.accommodationTypes !== "No Accommodation" && (
          <section className="my-12">
            <h3 className="mb-6 text-2xl font-semibold">
              Accommodation Details
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Accommodation Type</h4>
                </div>
                <p className="mt-2 text-muted-foreground">
                  {organization.accommodationTypes}
                </p>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h4 className="font-semibold">Distance to Amenities</h4>
                  <p className="text-muted-foreground">
                    {organization.distanceOfAmenities} miles
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Room Details</h4>
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
              </Card>
            </div>
          </section>
        )}

        <div>
          {studentNation && <StudentNationPieChat data={studentNation} />}
        </div>
      </MyContainer>
    </div>
  );
};

export default OrganizationInfo;
