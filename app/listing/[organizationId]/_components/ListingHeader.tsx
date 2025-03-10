import MyContainer from "@/components/Container";
import HeartButton from "@/components/listing/HeartButton";
import GoogleMap from "@/components/Map";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { ExtenderUser } from "@/next-auth";
import { Organization, SocialMedia } from "@prisma/client";
import { ArrowBigLeft, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { TbBrandInstagramFilled } from "react-icons/tb";

type Props = {
  organization: Organization;
  socialMedia?: SocialMedia;
  currentUser?: ExtenderUser | null;
};

const ListingHeader = ({ organization, socialMedia, currentUser }: Props) => {
  const router = useRouter();
  const goBack = () => {
    router.push(`/explore`);
  };
  return (
    <div>
      <div className="relative h-[200px] w-[100vw] overflow-hidden md:h-[500px]">
        <div className="absolute right-8 top-2 z-10">
          <HeartButton id={organization.id} currentUser={currentUser || null} />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={`${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${organization.coverPhoto}/-/preview/1280x600/`}
            className="h-full w-full object-cover object-center brightness-50"
          />
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-2xl font-bold text-zinc-50 md:text-8xl">
            {organization.name}
          </h1>
        </div>
        {socialMedia && (
          <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 transform">
            <div className="flex items-center gap-4">
              {socialMedia.website && (
                <Link
                  href={
                    socialMedia.website.startsWith("http")
                      ? socialMedia.website
                      : `https://${socialMedia.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <Globe className="h-6 w-6 text-white" />
                </Link>
              )}
              {socialMedia.facebook && (
                <Link
                  href={
                    socialMedia.facebook.startsWith("http")
                      ? socialMedia.facebook
                      : `https://${socialMedia.facebook}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <BiLogoFacebookCircle className="h-6 w-6 text-white" />
                </Link>
              )}
              {socialMedia.instagram && (
                <Link
                  href={
                    socialMedia.instagram.startsWith("http")
                      ? socialMedia.instagram
                      : `https://${socialMedia.instagram}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <TbBrandInstagramFilled className="h-6 w-6 text-white" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="absolute left-6 top-24 z-50">
        <Button
          onClick={() => goBack()}
          className="flex items-center justify-center gap-3"
        >
          <ArrowBigLeft className="h-6 w-6" />
          Back
        </Button>
      </div>
      <div className="flex w-full flex-col items-center justify-center p-3">
        <div className="my-8 flex w-full max-w-3xl flex-col justify-center gap-3">
          <h1 className="text-lg font-bold md:text-3xl">
            {organization.location}
          </h1>
          <div className="flex w-full flex-col items-center justify-start gap-6 px-2">
            {organization.description && (
              <div className="flex w-full flex-col justify-start gap-4">
                <p className="mb-6 whitespace-pre-line text-muted-foreground">
                  {organization.description}
                </p>
                <StarRating rating={organization.rating} readOnly />
              </div>
            )}
            <GoogleMap
              lat={organization.lat}
              lng={organization.lng}
              className="md:max-w-2/3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;
