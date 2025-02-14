import MyContainer from "@/components/Container";
import GoogleMap from "@/components/Map";
import { features, schoolFacilities } from "@/data/data";
import { Organization } from "@prisma/client";
import { Check } from "lucide-react";
import React from "react";

type Props = {
  organization: Organization;
};

const OrganizationInfo = ({ organization }: Props) => {
  return (
    <div className="flex h-full w-full flex-col">
      <MyContainer>
        <div className="flex w-full flex-col justify-center gap-3">
          <h1 className="text-3xl font-bold">{organization.location}</h1>
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            {organization.description && (
              <p className="mb-6 text-muted-foreground">
                {organization.description}
              </p>
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
      </MyContainer>
    </div>
  );
};

export default OrganizationInfo;
