"use client";
import { Organization } from "@prisma/client";
import ResponsiveModel from "../global/responsive-model";
import Modal from "./Modal";
import { useAccommodationModal } from "@/hooks/modal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, DollarSign, Home, Hotel, MapPin, Wifi } from "lucide-react";
import { Separator } from "../ui/separator";
import { formattedPrice } from "@/lib/formatPrice";
import ListingGallery from "@/app/listing/[organizationId]/_components/ListingGallery";

type Props = {
  organization: Organization;
};

const AccommodationModal = ({ organization }: Props) => {
  const { isOpen, setIsOpen } = useAccommodationModal();

  const bodyContent = (
    <div className="my-8">
      <Card className="grid gap-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />

            <h2 className="font-semibold">{organization.accommodationTypes}</h2>
          </div>

          <Separator className="my-4" />
          {organization.amenityGallery.length > 0 && (
            <div>
              <ListingGallery gallery={organization.amenityGallery} />
              <Separator className="my-4" />
            </div>
          )}

          <div className="space-y-2">
            <h2 className="font-semibold">Distance to Amenities</h2>
            <p className="text-muted-foreground">
              {organization.distanceOfAmenities} miles
            </p>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Room Details</h2>
          </div>

          <div className="mt-2">
            <h5 className="text-sm font-medium">Available Room Types:</h5>
            <p className="text-muted-foreground">{organization.roomTypes}</p>
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

        <CardContent>
          {organization.homeStayPreference.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Home Stay Preferences</h2>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {organization.homeStayPreference.map((preference, index) => (
                    <Badge key={index} variant="secondary">
                      {preference}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Pricing</h2>
            </div>
            <div className="space-y-2">
              {organization.accommodationHomeStayPrice !== 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Home Stay
                  </span>
                  <Badge variant="outline">
                    {formattedPrice(organization.accommodationHomeStayPrice!)}
                    /week
                  </Badge>
                </div>
              )}
              {organization.accommodationStudentResidencePrice !== 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Student Residence
                  </span>
                  <Badge variant="outline">
                    {formattedPrice(
                      organization.accommodationStudentResidencePrice!,
                    )}
                    /week
                  </Badge>
                </div>
              )}
              {organization.accommodationPrivateApartmentPrice !== 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Private Apartment
                  </span>

                  <Badge variant="outline">
                    {formattedPrice(
                      organization.accommodationPrivateApartmentPrice!,
                    )}
                    /week
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
  return (
    <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal title="Accommodation Details" body={bodyContent} />
    </ResponsiveModel>
  );
};

export default AccommodationModal;
