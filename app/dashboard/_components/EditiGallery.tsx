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
  useEditGallery,
} from "@/hooks/create-organization";

LR.registerBlocks(LR);

type SelectedImage = {
  preview: string;
  file: File;
};

type Props = {
  gallery: string[];
  setGallery: (updateFn: (prev: string[]) => string[]) => void;
};

const EditGallery = ({ gallery, setGallery }: Props) => {
  const { onDeleteUploadcare, isPending: isDeleting } = useDeleteUploadcare();

  // State for images that have been selected (but not yet uploaded)
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  // State for managing the global upload-all process
  const [isUploadingAll, setIsUploadingAll] = useState(false);

  const imgInputRef = useRef<HTMLInputElement>(null);

  // Hook for uploading a single image.
  // We assume uploadImageMutate returns a Promise resolving with the uploaded image URL.
  const { uploadImageMutate, isPending } = useEditGallery(setGallery);

  // Handle multiple file selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const filesArray = Array.from(files);
    // Determine how many more images can be added (limit total to 10)
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
    // Clear file input so the same file can be selected again if needed
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
  };

  // Remove a pending (not yet uploaded) image
  const handleRemoveSelected = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove an already uploaded image
  const handleRemoveUploaded = (id: string, index: number) => {
    if (gallery.length > 0) {
      onDeleteUploadcare(id);
    }
    setGallery((prevGallery) => prevGallery.filter((_, i) => i !== index));
  };

  // Upload all selected images at once
  const handleUploadAll = async () => {
    if (selectedImages.length === 0) return;
    setIsUploadingAll(true);
    try {
      // Upload all images concurrently
      await Promise.all(
        selectedImages.map((img) => uploadImageMutate(img.file)),
      );

      // Clear the pending images list
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
      {/* Display uploaded and pending images in a grid */}
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
              {/* Button to remove an uploaded image */}
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
              {/* Checkmark icon indicating the image is uploaded */}
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
              {/* Button to remove the pending image */}
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

      {/* Hidden file input that accepts multiple files */}
      <Input
        type="file"
        multiple
        className="hidden"
        ref={imgInputRef}
        onChange={handleImageChange}
        accept=".jpg, .jpeg, .png, .svg"
      />

      {/* "Choose Image" button */}
      {gallery.length + selectedImages.length < 10 && (
        <div>
          <Button
            type="button"
            size="sm"
            className="mt-2 w-fit"
            variant="outline"
            onClick={() => imgInputRef.current?.click()}
          >
            Choose Image
          </Button>
        </div>
      )}

      {/* Global Upload All button for pending images */}
      {selectedImages.length > 0 && (
        <div>
          <Button
            type="button"
            size="sm"
            className="mt-2 w-fit"
            variant="outline"
            onClick={handleUploadAll}
            disabled={isUploadingAll || isPending || gallery.length >= 10}
          >
            {/* {isUploadingAll ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Upload All"
            )} */}
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : gallery.length >= 10 ? (
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

export default EditGallery;
