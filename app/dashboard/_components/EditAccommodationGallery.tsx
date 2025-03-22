"use client";

import { useState, useRef } from "react";
import { Trash2, CheckCircle, ImageIcon, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { TbPhotoPlus } from "react-icons/tb";
import * as LR from "@uploadcare/blocks";
import {
  useDeleteUploadcare,
  useEditRoomGallery,
  useUploadRoomGallery,
} from "@/hooks/create-organization";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

LR.registerBlocks(LR);

type Props = {
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
};

type SelectedImage = {
  preview: string;
  file: File;
};

const EditAccommodationGallery = ({ setValue, watch }: Props) => {
  const { onDeleteUploadcare, isPending: isDeleting } = useDeleteUploadcare();
  const gallery: string[] = watch("amenityGallery") || [];
  const { uploadImageMutate, isPending } = useEditRoomGallery(
    setValue,
    gallery,
  );

  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [isUploadingAll, setIsUploadingAll] = useState(false);

  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    const remaining = 10 - (gallery.length + selectedImages.length);
    if (remaining <= 0) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    const allowedFiles = filesArray.slice(0, remaining);
    const newSelected = allowedFiles.map((file) => ({
      preview: URL.createObjectURL(file),
      file,
    }));
    setSelectedImages((prev) => [...prev, ...newSelected]);

    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
  };

  const handleRemoveSelected = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveUploaded = (id: string, index: number) => {
    if (gallery.length > 0) {
      onDeleteUploadcare(id);
    }
    const newGallery = gallery.filter((_, i) => i !== index);
    setValue("amenityGallery", newGallery, { shouldValidate: true });
  };

  const handleUploadAll = async () => {
    if (selectedImages.length === 0) return;
    setIsUploadingAll(true);
    try {
      const uploaded = await Promise.all(
        selectedImages.map((img) => uploadImageMutate(img.file)),
      );
      const updatedGallery = [...gallery, ...uploaded];
      setValue("amenityGallery", updatedGallery, { shouldValidate: true });
      setSelectedImages([]);
    } catch (error) {
      toast.error("One or more uploads failed");
    } finally {
      setIsUploadingAll(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-3">
      {isPending && (
        <div className="absolute inset-0 z-[9999] flex h-full w-full items-center justify-center bg-transparent backdrop-blur-sm">
          <Loader2 className="animate-spin text-3xl text-rose-500" />
        </div>
      )}

      {gallery.length > 0 || selectedImages.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {gallery.map((src, index) => (
            <div key={`uploaded-${index}`} className="relative">
              <img
                src={`${process.env.NEXT_PUBLIC_UPLOADCARE_BASE_URL}/${src}/-/preview/300x300/`}
                alt={`Uploaded image ${index + 1}`}
                width={200}
                height={200}
                className="rounded-lg object-cover object-center"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="absolute right-1 top-1"
                onClick={() => handleRemoveUploaded(src, index)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
              <div className="absolute bottom-1 right-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          ))}

          {selectedImages.map((img, index) => (
            <div key={`selected-${index}`} className="relative">
              <img
                src={img.preview}
                alt={`Preview image ${index + 1}`}
                width={200}
                height={200}
                className="rounded-lg object-cover object-center"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="absolute right-1 top-1"
                onClick={() => handleRemoveSelected(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
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
        multiple
        className="hidden"
        ref={imgInputRef}
        onChange={handleImageChange}
        accept=".jpg, .jpeg, .png, .svg"
      />

      {gallery.length + selectedImages.length < 10 && (
        <Button
          type="button"
          size="sm"
          className="mt-2 w-fit"
          variant="outline"
          onClick={() => imgInputRef.current?.click()}
        >
          Choose Image
        </Button>
      )}

      {selectedImages.length > 0 && (
        <Button
          type="button"
          size="sm"
          className="mt-2 w-fit"
          variant="outline"
          onClick={handleUploadAll}
          disabled={isUploadingAll || isPending || gallery.length >= 10}
        >
          {isUploadingAll || isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <TbPhotoPlus className="h-4 w-4 text-green-600" />
          )}
        </Button>
      )}
    </div>
  );
};

export default EditAccommodationGallery;
