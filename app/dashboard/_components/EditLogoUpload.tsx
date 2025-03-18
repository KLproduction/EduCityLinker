import { useState, useRef } from "react";
import { Trash2, CheckCircle, ImageIcon, Loader2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TbPhotoPlus } from "react-icons/tb";
import "@uploadcare/react-uploader/core.css";
import * as LR from "@uploadcare/blocks";

import { set } from "lodash";
import {
  useDeleteUploadcare,
  useEditLogo,
  useUploadLogo,
} from "@/hooks/create-organization";

LR.registerBlocks(LR);

type Props = {
  logoSrcId: string;
  setLogoSrcId: (id: string) => void;
};
const EditLogoUpload = ({ logoSrcId, setLogoSrcId }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const { uploadImageMutate, isPending } = useEditLogo(setLogoSrcId);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setUploadFile(file);
    }
  };

  const { onDeleteUploadcare, isPending: isDeleting } = useDeleteUploadcare();

  const logoSrc = `${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${logoSrcId}/-/preview/300x300/`;

  const handleImageDelete = (id: string) => {
    if (logoSrcId) {
      onDeleteUploadcare(id);
    }
    setPreviewUrl(null);
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
      setLogoSrcId("");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {previewUrl || logoSrcId ? (
        <div className="mt-6 flex h-full w-full items-center justify-center">
          <img
            src={previewUrl || logoSrc}
            alt="image"
            className="h-48 w-48 rounded-full object-cover object-center"
          />
        </div>
      ) : (
        <Avatar className="size-[72px]">
          <AvatarFallback>
            <ImageIcon className="size-[50px] p-3 text-zinc-500" />
          </AvatarFallback>
        </Avatar>
      )}

      <Input
        type="file"
        className="hidden"
        ref={imgInputRef}
        onChange={handleImageChange}
        accept=".jpg, .jpeg, .png, .svg"
      />
      {!previewUrl && !logoSrcId ? (
        <div>
          <Button
            type="button"
            size={"sm"}
            className="mt-2 w-fit"
            variant={"outline"}
            onClick={() => imgInputRef.current?.click()}
          >
            Choose Image
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-5">
          <Button
            type="button"
            size={"sm"}
            className="mt-2 w-fit"
            variant={"outline"}
            onClick={() => handleImageDelete(logoSrcId!)}
            disabled={isDeleting}
          >
            {/* TO DO : ADD DELETE HOOK */}
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            className="mt-2 w-fit"
            onClick={() => uploadImageMutate(uploadFile!)}
            disabled={logoSrcId ? true : false}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : logoSrcId ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <TbPhotoPlus className="h-4 w-4 text-green-600" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
export default EditLogoUpload;
