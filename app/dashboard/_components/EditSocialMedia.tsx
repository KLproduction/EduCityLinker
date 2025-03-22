"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { TbBrandInstagramFilled } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { useUpdateSocialMedia } from "@/hooks/create-organization";

type Props = {
  organizationId: string;
  initialSocialMedia?: {
    facebook?: string;
    instagram?: string;
    website?: string;
  }; // ✅ Make optional
};

const EditSocialMedia = ({
  organizationId,
  initialSocialMedia = {},
}: Props) => {
  const { updateSocialMedia, isPending } = useUpdateSocialMedia(organizationId);

  // ✅ Ensure state always has default values
  const [socialMedia, setSocialMedia] = useState({
    facebook: initialSocialMedia.facebook || "",
    instagram: initialSocialMedia.instagram || "",
    website: initialSocialMedia.website || "",
  });

  useEffect(() => {
    if (initialSocialMedia) {
      setSocialMedia({
        facebook: initialSocialMedia.facebook || "",
        instagram: initialSocialMedia.instagram || "",
        website: initialSocialMedia.website || "",
      });
    }
  }, [initialSocialMedia]);

  const handleChange = (field: keyof typeof socialMedia, value: string) => {
    setSocialMedia((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    updateSocialMedia(socialMedia);
  };

  return (
    <div className="space-y-4 p-4">
      {/* Facebook Input */}
      <div className="relative">
        <BiLogoFacebookCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          onChange={(e) => handleChange("facebook", e.target.value)}
          placeholder="Facebook URL"
          value={socialMedia.facebook}
          className="bg-zinc-50 pl-10"
        />
      </div>

      {/* Instagram Input */}
      <div className="relative">
        <TbBrandInstagramFilled className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          onChange={(e) => handleChange("instagram", e.target.value)}
          placeholder="Instagram URL"
          value={socialMedia.instagram}
          className="bg-zinc-50 pl-10"
        />
      </div>

      {/* Website Input */}
      <div className="relative">
        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <Input
          onChange={(e) => handleChange("website", e.target.value)}
          placeholder="Website URL"
          value={socialMedia.website}
          className="bg-zinc-50 pl-10"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="button"
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default EditSocialMedia;
