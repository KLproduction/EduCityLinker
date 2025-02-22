"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { setSocialMediaData } from "@/redux/slice/create-organizationSocialMediaSlice";
import { Globe } from "lucide-react";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { TbBrandInstagramFilled } from "react-icons/tb";

const SocialMediaInput = () => {
  const dispatch = useAppDispatch();
  const socialMedia = useAppSelector((state) => state.socialMedia);

  return (
    <div className="space-y-4 p-4">
      {/* Facebook Input */}
      <div className="relative">
        <BiLogoFacebookCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          onChange={(e) =>
            dispatch(setSocialMediaData({ facebook: e.target.value }))
          }
          placeholder="Facebook URL"
          value={socialMedia.facebook}
          className="bg-zinc-50 pl-10" // Adds padding to avoid overlapping icon
        />
      </div>

      {/* Instagram Input */}
      <div className="relative">
        <TbBrandInstagramFilled className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          onChange={(e) =>
            dispatch(setSocialMediaData({ instagram: e.target.value }))
          }
          placeholder="Instagram URL"
          value={socialMedia.instagram}
          className="bg-zinc-50 pl-10"
        />
      </div>

      {/* Website Input */}
      <div className="relative">
        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          onChange={(e) =>
            dispatch(setSocialMediaData({ website: e.target.value }))
          }
          placeholder="Website URL"
          value={socialMedia.website}
          className="bg-zinc-50 pl-10"
        />
      </div>
    </div>
  );
};

export default SocialMediaInput;
