"use client";

import { Listing, Organization } from "@prisma/client";
import EmptyState from "./EmptyState";
import { use, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ListingCard from "@/components/listing/ListingCard";
import Image from "next/image";
import HeartButton from "@/components/listing/HeartButton";
import { ExtenderUser } from "@/next-auth";
import { Badge, Book, Calendar, Check, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formattedPrice } from "@/lib/formatPrice";
import { Separator } from "@/components/ui/separator";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import ListingSection from "@/components/listing/ListingSection";
import StarRating from "@/components/StarRating";

type Props = {
  data: (Organization & { listings: Listing[] })[];

  currentUser?: ExtenderUser | null;
};

const ListingTable = ({ data, currentUser }: Props) => {
  const params = useSearchParams();
  const pathname = usePathname();
  const categoryFilter = params.get("category");
  const ageGroupsFilter = params.get("age-groups");
  const courseLevelsFilter = params.get("course-levels");
  const priceFilter = params.get("price");
  const accommodationFilter = params.get("accommodation-types");
  const citiesFilter = params.get("organization-cities");

  const [organizations, setOrganizations] =
    useState<(Organization & { listings: Listing[] })[]>(data);

  useEffect(() => {
    let filteredData = data;

    if (citiesFilter) {
      const citiesArr = citiesFilter
        .split(",")
        .map((item) => decodeURIComponent(item).trim());
      filteredData = filteredData
        .map((organization) => ({
          ...organization,
          listings: organization.listings.filter((listing) =>
            citiesArr.includes(organization.city),
          ),
        }))
        .filter((organization) => organization.listings.length > 0);
    }

    if (categoryFilter) {
      filteredData = filteredData
        .map((organization) => ({
          ...organization,
          listings: organization.listings.filter(
            (listing) => listing.courseType === categoryFilter,
          ),
        }))
        .filter((organization) => organization.listings.length > 0);
    }

    if (ageGroupsFilter) {
      const ageGroupsArr = ageGroupsFilter
        .split(",")
        .map((item) => decodeURIComponent(item).trim());
      filteredData = filteredData
        .map((organization) => ({
          ...organization,
          listings: organization.listings.filter((listing) =>
            ageGroupsArr.includes(listing.ageGroups),
          ),
        }))
        .filter((organization) => organization.listings.length > 0);
    }
    if (courseLevelsFilter) {
      const courseLevelsArr = courseLevelsFilter
        .split(",")
        .map((item) => decodeURIComponent(item).trim());
      filteredData = filteredData
        .map((organization) => ({
          ...organization,
          listings: organization.listings.filter((listing) =>
            courseLevelsArr.includes(listing.courseLevels),
          ),
        }))
        .filter((organization) => organization.listings.length > 0);
    }
    if (accommodationFilter) {
      const accommodationArr = accommodationFilter
        .split(",")
        .map((item) => decodeURIComponent(item).trim());

      filteredData = filteredData.filter((organization) => {
        const orgAccommodationTypes = organization.accommodationTypes
          ? organization.accommodationTypes
              .split(",")
              .map((type) => type.trim())
          : [];

        return orgAccommodationTypes.some((type) =>
          accommodationArr.includes(type),
        );
      });
    }

    if (priceFilter) {
      filteredData = filteredData
        .map((organization) => ({
          ...organization,
          listings: organization.listings.filter(
            (listing) => listing.price <= parseInt(priceFilter),
          ),
        }))
        .filter((organization) => organization.listings.length > 0);
    }

    setOrganizations(filteredData);
  }, [
    data,
    categoryFilter,
    ageGroupsFilter,
    params,
    courseLevelsFilter,
    priceFilter,
    accommodationFilter,
  ]);

  if (organizations.length === 0)
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:min-w-[1000px]">
        <EmptyState showReset />
      </div>
    );

  const viewSchool = () => {
    const queryParams = new URLSearchParams();
    params.forEach((value, key) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    const fullUrl = `${pathname}?${queryParams.toString()}`;
    sessionStorage.setItem("previousExploreUrl", fullUrl);
    console.log(fullUrl);
  };

  return (
    <div className="mx-auto flex w-full max-w-[280] flex-col gap-6 py-8 md:min-w-full md:max-w-7xl">
      {organizations.map((organizer) => (
        <Card key={organizer.id} className="overflow-hidden p-4">
          {/* Organizer Header: Cover Photo | Name + Location + Button */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            {/* Cover Photo (Responsive) */}
            {organizer.coverPhoto && (
              <div className="relative h-40 w-full overflow-hidden rounded-md sm:h-48 sm:w-1/3">
                <div className="absolute right-2 top-2 z-10">
                  <HeartButton
                    id={organizer.id}
                    currentUser={currentUser || null}
                  />
                </div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${organizer.coverPhoto}/-/preview/600x400/`}
                  alt={organizer.name}
                  layout="fill"
                  loading="lazy"
                  objectFit="cover"
                  className="transition duration-300 group-hover:scale-110"
                />
              </div>
            )}

            {/* Organizer Info */}
            <div className="flex w-full flex-col sm:w-2/3">
              <CardTitle className="flex items-center gap-10 text-lg sm:text-xl">
                <div>{organizer.name}</div>
                <div>
                  <StarRating rating={organizer.rating} readOnly />
                </div>
              </CardTitle>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={16} className="mr-1" />
                {organizer.location}
              </div>
              <Separator className="my-2" />
              {/* Features List */}
              <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
                {organizer.feature.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check size={16} className="mr-1 text-green-500" />
                    <p className="text-xs">{feature}</p>
                  </div>
                ))}
                {organizer.feature.length > 4 && (
                  <span className="text-gray-500">and more...</span>
                )}
              </div>
            </div>

            {/* Button (Stacks on small screens) */}
            <div className="flex w-full justify-end sm:h-full sm:w-auto sm:items-center">
              <Link
                href={`/listing/${organizer.id}`}
                onClick={() => viewSchool()}
              >
                <Button variant="outline" className="w-full sm:w-auto">
                  View School
                </Button>
              </Link>
            </div>
          </div>

          {/* Listings Section */}
          <div className="mt-4 space-y-4">
            {organizer.listings.map((listing) => (
              <div key={listing.id}>
                <ListingSection listing={listing} />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ListingTable;
