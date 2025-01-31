import { useState, useRef, useCallback, useEffect } from "react";
import { Trash2, CheckCircle, ImageIcon, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setCourseData } from "@/redux/slice/create-courseSlice";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import * as LR from "@uploadcare/blocks";

import { useUploadImage } from "@/hooks/create-course";
import { set } from "lodash";

LR.registerBlocks(LR);

type Props = {};
const ImageUpload = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const { uploadImageMutate, isPending } = useUploadImage();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setUploadFile(file);
    }
  };
  const imageSrc = useAppSelector((state) => state.createCourse.imageSrc);
  useEffect(() => {
    console.log("IMG", imageSrc);
  }, [handleImageChange]);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {previewUrl || imageSrc ? (
        <div className="mt-6 flex h-full w-full items-center justify-center">
          <img
            src={previewUrl || imageSrc}
            alt="image"
            width={200}
            height={200}
            className="aspect-ratio relative flex rounded-lg object-cover object-center"
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
      {!previewUrl && !imageSrc ? (
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
            onClick={() => {
              setPreviewUrl(null);
              if (imgInputRef.current) {
                imgInputRef.current.value = "";
                dispatch(setCourseData({ imageSrc: undefined }));
              }
            }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            className="mt-2 w-fit"
            onClick={() => uploadImageMutate(uploadFile!)}
            disabled={imageSrc ? true : false}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : imageSrc ? (
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
export default ImageUpload;
